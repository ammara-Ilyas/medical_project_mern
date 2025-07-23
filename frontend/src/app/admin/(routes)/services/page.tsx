"use client";
import { useEffect, useState } from "react";
import { servicesAPI } from "../../../../services/api";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    shortDescription: "",
    image: null, // file object
    icon: "",
    price: "",
    category: "",
    duration: "",
    tags: "",
    isActive: true,
    featured: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Stats
  const total = services.length;
  const active = services.filter(s => s.isActive).length;
  const featured = services.filter(s => s.featured).length;

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await servicesAPI.getAll();
      setServices(res.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form input
  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (type === "file" ? files[0] : value),
    }));
  };

  // Handle add service
  const handleAddService = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('shortDescription', form.shortDescription);
      formData.append('icon', form.icon);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('duration', form.duration);
      formData.append('isActive', form.isActive);
      formData.append('featured', form.featured);
      formData.append('tags', form.tags);
      if (form.image) {
        formData.append('image', form.image);
      }
      await servicesAPI.create(formData);
      setSuccess("Service added successfully!");
      setShowModal(false);
      setForm({
        title: "",
        description: "",
        shortDescription: "",
        image: null,
        icon: "",
        price: "",
        category: "",
        duration: "",
        tags: "",
        isActive: true,
        featured: false,
      });
      fetchServices();
    } catch (err: any) {
      setError(err.message || "Failed to add service");
    }
  };

  // Handle delete service
  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesAPI.delete(serviceId);
      setSuccess('Service deleted successfully!');
      fetchServices();
    } catch (err: any) {
      setError(err.message || 'Failed to delete service');
    }
  };

  // Handle edit service
  const handleEditService = (service: any) => {
    setEditMode(true);
    setEditingService(service);
    setForm({
      ...service,
      image: null, // reset image input for new upload
      tags: service.tags ? service.tags.join(', ') : '',
      price: service.price ? String(service.price) : '',
    });
    setShowModal(true);
  };

  // Handle update service
  const handleUpdateService = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('shortDescription', form.shortDescription);
      formData.append('icon', form.icon);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('duration', form.duration);
      formData.append('isActive', form.isActive);
      formData.append('featured', form.featured);
      formData.append('tags', form.tags);
      if (form.image) {
        formData.append('image', form.image);
      }
      await servicesAPI.update(editingService._id, formData);
      setSuccess('Service updated successfully!');
      setShowModal(false);
      setEditMode(false);
      setEditingService(null);
      setForm({
        title: '',
        description: '',
        shortDescription: '',
        image: null,
        icon: '',
        price: '',
        category: '',
        duration: '',
        tags: '',
        isActive: true,
        featured: false,
      });
      fetchServices();
    } catch (err: any) {
      setError(err.message || 'Failed to update service');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2B6C]">Services</h1>
        <button
          className="bg-[#159EEC] text-white px-4 py-2 rounded font-semibold hover:bg-[#1F2B6C] transition"
          onClick={() => setShowModal(true)}
        >
          + Add Service
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded shadow">
          <div className="text-3xl font-bold text-[#159EEC]">{total}</div>
          <div className="text-gray-700">Total Services</div>
        </div>
        <div className="bg-green-50 p-4 rounded shadow">
          <div className="text-3xl font-bold text-green-600">{active}</div>
          <div className="text-gray-700">Active Services</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow">
          <div className="text-3xl font-bold text-yellow-600">{featured}</div>
          <div className="text-gray-700">Featured Services</div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-8">Loading...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8">No services found.</td></tr>
            ) : services.map((service) => (
              <tr key={service._id}>
                <td className="px-4 py-2">
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="px-4 py-2 font-semibold text-[#1F2B6C]">{service.title}</td>
                <td className="px-4 py-2">{service.category || '-'}</td>
                <td className="px-4 py-2">{service.price ? `Rs. ${service.price}` : '-'}</td>
                <td className="px-4 py-2">
                  {service.tags && service.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {service.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                      ))}
                    </div>
                  ) : '-'}
                </td>
                <td className="px-4 py-2">
                  {service.isActive ? <span className="text-green-600 font-bold">Active</span> : <span className="text-gray-400">Inactive</span>}
                </td>
                <td className="px-4 py-2">
                  {service.featured ? <span className="text-yellow-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-200"
                    onClick={() => handleEditService(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold hover:bg-red-200"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => {
                setShowModal(false);
                setEditMode(false);
                setEditingService(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#1F2B6C]">{editMode ? 'Edit Service' : 'Add Service'}</h2>
            {error && <div className="mb-2 text-red-600">{error}</div>}
            {success && <div className="mb-2 text-green-600">{success}</div>}
            <form onSubmit={editMode ? handleUpdateService : handleAddService} className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="w-full border rounded px-3 py-2" />
              <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className="w-full border rounded px-3 py-2" />
              <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Description" className="w-full border rounded px-3 py-2" rows={3} />
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="Icon (e.g. FiActivity)" className="w-full border rounded px-3 py-2" />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price (Rs.)" className="w-full border rounded px-3 py-2" type="number" min="0" />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border rounded px-3 py-2" />
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 30 min)" className="w-full border rounded px-3 py-2" />
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full border rounded px-3 py-2" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2" />
                {editMode && editingService?.image && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Current Image:</span>
                    <img src={editingService.image} alt="Current" className="w-16 h-16 object-cover rounded mt-1" />
                  </div>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured
                </label>
              </div>
              <button type="submit" className="w-full bg-[#159EEC] text-white py-2 rounded font-bold hover:bg-[#1F2B6C] transition">{editMode ? 'Update Service' : 'Add Service'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 