module.exports = {
    serverError: 500,
    successMessage: {
        "message": "Success"
    },
    auth: {
        admin: 2,
        writer: 1,
        player: 0
    },
    playerStatus: {
        active: 0,
        inactive: 1,
        banned: 2
    },
    codes: {
        correctAnswer: {
            code: 0,
            message: "Correct Answer"
        },
        wrongAnswer: {
            code: 1,
            message: "Wrong message"
        },
        playerNotActive: {
            code: 10,
            errmsg: "Player is not active"
        },
        noPlayerFound: {
            code: 20,
            errmsg: "Player details not found"
        }
    },
    maxLevel: 10
}
