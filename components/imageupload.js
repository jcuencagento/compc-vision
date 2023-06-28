import { useState } from 'react';
import styles from '../styles/utils.module.css';
import axios from 'axios';

export default function ImageUpload({ onImageUpload }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setSelectedImage(imageURL);

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('/api/upload', formData);
                const imageUrl = response.data.imageUrl;
                onImageUpload(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className={styles.uploadImage}>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {selectedImage && (
                <div className={styles.imageUploadDiv}>
                    <img className={styles.imageUploaded} src={selectedImage} alt="Selected" />
                </div>
            )}
        </div>
    );
}
