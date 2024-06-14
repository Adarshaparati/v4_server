function user(submission) {
    const {user} = submission;
    const userResponse = {
        userId: user.userId,               
        submissionId: user.submissionId          
    };

    return userResponse;
}

module.exports = user;
