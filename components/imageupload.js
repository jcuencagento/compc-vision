import { useState } from 'react';
import styles from '../styles/utils.module.css';

export default function ImageUpload({ onImageUpload }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                onImageUpload(true);
            };

            reader.readAsDataURL(file);
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
