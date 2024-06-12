const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
require('dotenv').config()

const CREDENTIALS_PATH = process.env.CREDENTIALS_PATH;

async function loadSavedCredentialsIfExist(TOKEN_PATH) {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client, TOKEN_PATH) {
  const content = await fs.readFile(process.env.CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize(SCOPES, TOKEN_PATH) {
  let client = await loadSavedCredentialsIfExist(TOKEN_PATH);
  if (client) {
    return client;
  }

  try {
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: process.env.CREDENTIALS_PATH,
    });
    await saveCredentials(client, TOKEN_PATH);
    return client;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
}

module.exports = { authorize };
