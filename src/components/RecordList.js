import React, { useEffect, useState } from 'react';
import { getBloodRecords, updateBloodRecord, deleteBloodRecord, addOrUpdateBloodRecord } from '../services/bloodService';
import './RecordList.css';

const RecordListWithModal = () => {
    const [data, setData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [modalType, setModalType] = useState(''); // Track modal type: 'add' or 'update'
    const [form, setForm] = useState({
        date: '',
        location: '',
        bloodType: '',
        event: '',
        donations: '',
        supply: '',
        temperature: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await getBloodRecords();
                console.log(records); // Check the structure of the fetched records
                setData(records);
            } catch (error) {
                console.error("Error fetching blood records:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedRecord) {
            setForm({
                date: selectedRecord.date || '',
                location: selectedRecord.location || '',
                bloodType: selectedRecord.bloodType || '',
                event: selectedRecord.event || '',
                donations: selectedRecord.donations || '',
                supply: selectedRecord.supply || '',
                temperature: selectedRecord.temperature || ''
            });
        }
    }, [selectedRecord]);

    const handleUpdate = (record) => {
        setSelectedRecord(record);
        setModalType('update');
        setShowModal(true);
    };

    const handleAdd = () => {
        setSelectedRecord(null);
        setModalType('add');
        setForm({
            date: '',
            location: '',
            bloodType: '',
            event: '',
            donations: '',
            supply: '',
            temperature: ''
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setRecordToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteBloodRecord(recordToDelete);
            setRecordToDelete(null);
            setShowDeleteConfirm(false);
            const records = await getBloodRecords();
            setData(records);
        } catch (error) {
            console.error("Error deleting blood record:", error);
        }
    };

    const cancelDelete = () => {
        setRecordToDelete(null);
        setShowDeleteConfirm(false);
    };

    const closeModal = () => {
        setSelectedRecord(null);
        setShowModal(false);
    };

    const handleSave = async (form) => {
        try {
            if (modalType === 'update') {
                await updateBloodRecord(selectedRecord.id, form);
            } else if (modalType === 'add') {
                await addOrUpdateBloodRecord(form);
            }
            closeModal();
            const records = await getBloodRecords();
            setData(records);
        } catch (error) {
            console.error("Error saving record:", error);
            alert("There was an error saving the record. Please try again.");
        }
    };

    return (
        <div className="blood-bank-container">
            <button className="add-record-button" onClick={handleAdd}>Add New Record</button>
            {data.map((item) => (
                <div className="blood-bank-box" key={item.id}>
                    <div className="blood-bank-info">
                        <div className="blood-bank-name-location">
                            <h2>{item.location}</h2>
                            <p>Blood Type: {item.bloodType}</p>
                        </div>
                        <div className="blood-bank-stock">
                            <p>Stock:</p>
                            <ul>
                                {(item.bloodStock || []).map((bloodType, index) => (
                                    <li key={index}>{bloodType.type}: {bloodType.amount}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="blood-bank-actions">
                        <button onClick={() => handleUpdate(item)}>Update</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (form.donations <= 0 || form.supply <= 0) {
                                    alert("Donations and Supply must be positive numbers.");
                                    return;
                                }
                                try {
                                    const formattedData = {
                                        ...form,
                                        bloodType: form.bloodType,
                                    };
                                    console.log("Submitting data:", formattedData);
                                    await handleSave(formattedData);
                                } catch (error) {
                                    console.error("Error saving record:", error);
                                    alert("There was an error saving the record. Please try again.");
                                }
                            }}
                        >
                            {/* Form Fields */}
                            <div className="input-container">
                                <label>Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    value={form.date || ''}
                                    onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                                    placeholder="Date"
                                    required
                                    disabled={modalType === 'update'}
                                />
                            </div>
                            <div className="input-container">
                                <label>Location</label>
                                <input
                                    name="location"
                                    value={form.location || ''}
                                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                                    placeholder="Location"
                                    required
                                    disabled={modalType === 'update'}
                                />
                            </div>
                            {modalType === 'update' ? (
                                <div className="input-container">
                                    <label htmlFor="bloodType">Blood Type:</label>
                                    <select
                                        id="bloodType"
                                        name="bloodType"
                                        value={form.bloodType || ''}
                                        onChange={(e) => setForm((prev) => ({ ...prev, bloodType: e.target.value }))}
                                    >
                                        {selectedRecord?.bloodStock?.map((bloodType, index) => (
                                            <option key={index} value={bloodType.type}>{bloodType.type}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className="input-container">
                                    <label>Blood Type</label>
                                    <input
                                        name="bloodType"
                                        value={form.bloodType || ''}
                                        onChange={(e) => setForm((prev) => ({ ...prev, bloodType: e.target.value }))}
                                        placeholder="Blood Type"
                                        required
                                    />
                                </div>
                            )}
                            <div className="input-container">
                                <label>Event</label>
                                <input
                                    name="event"
                                    value={form.event || ''}
                                    onChange={(e) => setForm((prev) => ({ ...prev, event: e.target.value }))}
                                    placeholder="Event"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Donations</label>
                                <input
                                    name="donations"
                                    type="number"
                                    value={form.donations || ''}
                                    onChange={(e) => setForm((prev) => ({ ...prev, donations: e.target.value }))}
                                    placeholder="Donations"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Supply</label>
                                <input
                                    name="supply"
                                    type="number"
                                    value={form.supply || ''}
                                    onChange={(e) => setForm((prev) => ({ ...prev, supply: e.target.value }))}
                                    placeholder="Supply"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Temperature</label>
                                <input
                                    name="temperature"
                                    type="number"
                                    value={form.temperature || ''}
                                    onChange={(e) => setForm((prev) => ({ ...prev, temperature: e.target.value }))}
                                    placeholder="Temperature"
                                    required
                                />
                            </div>
                            <button type="submit">{modalType === 'update' ? 'Update' : 'Add'}</button>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={cancelDelete}>&times;</span>
                        <p>Are you sure you want to delete this record?</p>
                        <button className="cancel" onClick={cancelDelete}>Cancel</button>
                        <button className="delete-confirm" onClick={confirmDelete}>Yes, Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordListWithModal;
