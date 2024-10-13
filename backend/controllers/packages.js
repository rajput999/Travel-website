const Package = require("../models/packages")

const getfixedpackages = async (req,res) =>{
    try{
        const allpackages= await Package.find();
        res.json(allpackages);
    }catch(error){
        res.status(500).json({message:'Error fetching packages'});
    }
}

const addPackage = async (req, res) => {
    const { id, name, duration, basePrice, description, longDescription, image } = req.body;
  
    // Validate required fields
    if (!id || !name || !duration || !basePrice || !description || !image || image.length === 0) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
  
    try {
      const newPackage = new Package({
        id,
        name,
        duration,
        basePrice,
        description,
        longDescription,
        image,
      });
  
      await newPackage.save();
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };


const updatePackage = async (req, res) => {
    try {
      const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.status(200).json(updatedPackage);
    } catch (error) {
      res.status(400).json({ message: 'Error updating package', error: error.message });
    }
  };
  
const deletePackage = async (req, res) => {
    try {
      const deletedPackage = await Package.findByIdAndDelete(req.params.id);
      if (!deletedPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting package', error: error.message });
    }
  };

module.exports = {getfixedpackages,addPackage,updatePackage,deletePackage};