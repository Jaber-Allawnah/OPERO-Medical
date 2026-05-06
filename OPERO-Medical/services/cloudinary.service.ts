export const uploadToCloudinary = async (uri: string): Promise<string> => {
    const form = new FormData();
    form.append('file', { uri, type: 'image/jpeg', name: 'photo.jpg' } as any);
    form.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: form }
    );
    const data = await res.json();
    if (!data.secure_url) throw new Error('Upload failed');
    return data.secure_url;
};
