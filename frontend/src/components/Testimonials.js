import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    location: '',
    image: '',
    rating: 0,
    content: ''
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/testimonials`);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.log('Error in fetching testimonials', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNewTestimonial({ ...newTestimonial, [name]: reader.result });
      };
      
      reader.readAsDataURL(file);
    } else {
      setNewTestimonial({ ...newTestimonial, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newTestimonial.name.slice(0, 100));
    formData.append('location', newTestimonial.location.slice(0, 100));
    if (newTestimonial.image) {
      formData.append('image', newTestimonial.image);
    }
    formData.append('rating', newTestimonial.rating.toString());
    formData.append('content', newTestimonial.content.slice(0, 1000));
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/testimonials/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setTestimonials([...testimonials, response.data]);
      setNewTestimonial({ name: '', location: '', image: '', rating: 0, content: '' });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      if (error.response) {
        alert(error.response.data.message || 'An error occurred while submitting the testimonial');
      } else if (error.request) {
        alert('No response received from the server. Please try again later.');
      } else {
        alert('An error occurred while submitting the testimonial. Please try again.');
      }
    }
  };

  const handleRatingChange = (rating) => {
    setNewTestimonial({ ...newTestimonial, rating });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Testimonials Display Section */}
      <div className="my-24">
  <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">What Our Clients Say</h2>
  <div className="flex gap-12 overflow-x-auto pb-6 scrollbar-hide">
    {testimonials.map((testimonial, index) => (
      <div
        key={index}
        className="max-w-[350px] flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <div className="relative h-80 overflow-hidden">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="font-semibold text-xl text-white">{testimonial.name}</h3>
            <p className="text-sm text-gray-300">{testimonial.location}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Quote size={24} className="text-orange-400 mr-2" />
            <div className="flex">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-gray-600">{testimonial.content}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Testimonial Form Section */}
      <div className="my-24">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">Share Your Experience</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={newTestimonial.location}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your location"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
              Upload Your Photo (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${newTestimonial.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Testimonial
            </label>
            <textarea
              name="content"
              value={newTestimonial.content}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Share your experience"
            />
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Submit Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;