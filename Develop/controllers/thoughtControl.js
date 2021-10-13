// Get all thoughts, and their reactions
exports.getAll = async (req, res) => {
    console.log('thought, getAll running')
}

// Get a single thought by id (:thoughtid passed as param)
exports.getOne = async (req, res) => {
    console.log('thought, getOne running')
}

// Create a new thought
// Push to user's thought array
// content is required, 1-280 char
// createdAt is time of creation, formatted manually
// username of the one who created it is required (:userid is param)
// Will have reactions array, but empty for now
exports.create = async (req, res) => {
    console.log('thought, create running')
}

// Update thought by ID (:thoughtid is param)
exports.update = async (req, res) => {
    console.log('thought, update running')
}

// Delete thought by ID (:thoughtid is param)
exports.remove = async (req, res) => {
    console.log('thought, remove running')
}