// Create reaction
// Reaction is part of thought model
// id is the mongoose objectid (default)
// reactionbody is required, 280char max
// username is required, the one that created it (:userid is a param)
// createdAt is date at time of submission, format manually
// Store this in the thought's reactions array (:thoughtid is a param)
exports.create = async (req, res) => {
    console.log('reaction, create running')
}

// Remove reaction by id (:reactionid and :thoughtid are params)
exports.delete = async (req, res) => {
    console.log('reaction, delete running')
}