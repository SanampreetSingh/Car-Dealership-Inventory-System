import cloudinary from '../../src/config/cloudinary';

describe('Cloudinary Live Integration Test', () => {
  // We use a tiny 1x1 pixel base64 image so we don't need a real file on disk
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  let uploadedPublicId: string;

  it('should successfully connect to Cloudinary and upload an image', async () => {
    // 1. Upload the image
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'test-folder',
    });

    // 2. Save the public_id so we can delete it later
    uploadedPublicId = result.public_id;

    // 3. Assertions
    expect(result).toBeDefined();
    expect(result.secure_url).toContain('cloudinary.com');
    expect(result.public_id).toBeDefined();
  }, 10000); // Increase timeout to 10s since real network requests take time

  it('should clean up and delete the test image from Cloudinary', async () => {
    // Skip if upload failed
    if (!uploadedPublicId) {
      console.log('Skipping cleanup because upload failed or public_id is missing.');
      return;
    }

    // 1. Delete the image
    const deletionResult = await cloudinary.uploader.destroy(uploadedPublicId);

    // 2. Assertions
    expect(deletionResult.result).toBe('ok');
  }, 10000);
});