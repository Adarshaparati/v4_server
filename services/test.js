const { authorize } = require('./auth');

async function generateToken() {
  // Define the required scopes
  const SCOPES = ['https://www.googleapis.com/auth/drive'];

  // Specify the path where you want to save the token file
  const TOKEN_PATH = 'token.json';

  try {
    // Authorize the application and get the client
    const client = await authorize([process.env.SLIDE_SCOPES],TOKEN_PATH);
    console.log('Token generated successfully!');
  } catch (error) {
    console.error('Error generating token:', error);
  }
}

// Call the function to generate the token
generateToken();