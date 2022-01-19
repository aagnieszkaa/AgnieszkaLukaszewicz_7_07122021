const db = require("../models");

exports.likePublication = async (req, res) => {
  try {
    const publication = await db.Publication.findOne({
        where: { id: req.params.publicationId },
    });
    const likeExist = await db.Like.findOne({ 
        where: { UtilisateurId: req.params.utilisateurId, PublicationId: req.params.publicationId }
    });
    if (likeExist) {
      await publication.update({ likes: publication.likes -1 })  
      await likeExist.destroy();
      return res.status(200).json({ like: false });
    } else {
        await publication.update({ likes: publication.likes +1 })  
        await db.Like.create({ 
            UtilisateurId: req.params.utilisateurId, 
            PublicationId: req.params.publicationId})
        return res.status(200).json({ like: true });
        }
    } 
    catch (error) {
        return res.status(400).json(error);
    }
};

