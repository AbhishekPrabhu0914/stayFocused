import React, { useRef, useEffect } from 'react';

const Webcam = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing webcam: ", err);
            }
        };

        getVideo();
    }, [videoRef]);

    const captureImage = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');

            // Send the image data to the backend
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData }),
            });

            if (response.ok) {
                const result = await response.json();
                const processedImage = result.processed_image;
                const img = new Image();
                img.onload = () => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = `data:image/png;base64,${processedImage}`;
                console.log('Image uploaded and processed successfully');
            } else {
                console.error('Error uploading image');
            }
        }
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <h1 className="text-white text-xl">Webcam App</h1>
                </div>
            </nav>
            <div className="flex flex-col justify-center items-center h-screen">
                <video ref={videoRef} autoPlay style={{ width: '50%', transform: 'scaleX(-1)' }} />
                <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
                <button onClick={() => videoRef.current.play()}>Play</button>
                <button onClick={() => videoRef.current.pause()}>Pause</button>
                <button onClick={captureImage}>Capture</button>
            </div>
        </div>
    );
};

export default Webcam;