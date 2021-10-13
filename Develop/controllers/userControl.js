// Get all existing users
exports.getAll = async (req, res) => {
    console.log('user, getAll running')
}

// Get user by their ID (:userid passed as param)
// Also get their thoughts and friend data
exports.getOne = async (req, res) => {
    console.log('user, getOne running')
}

// Create a user
// Username is unique, required, trimmed
// email is vaild (regex), unique, required
// they will have thoughts/friends as well, but empty for now
exports.create = async (req, res) => {
    console.log('user, create running')
}

// Update a user by their id (:userid passed as param)
exports.update = async (req, res) => {
    console.log('user, update running')
}

// Delete a user by their id (:userid passed as param)
// Also delete their thoughts
exports.delete = async (req, res) => {
    console.log('user, delete running')
}