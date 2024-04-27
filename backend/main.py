from fastapi import FastAPI, File, UploadFile
from PIL import Image
import numpy as np
from keras.models import load_model
from keras.utils import load_img, img_to_array
from io import BytesIO  # Import BytesIO
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
model = load_model('./models/fruits.h5')
labels = {0: 'apple', 1: 'banana', 2: 'beetroot', 3: 'bell pepper', 4: 'cabbage', 5: 'capsicum', 6: 'carrot',
          7: 'cauliflower', 8: 'chilli pepper', 9: 'corn', 10: 'cucumber', 11: 'eggplant', 12: 'garlic', 13: 'ginger',
          14: 'grapes', 15: 'jalepeno', 16: 'kiwi', 17: 'lemon', 18: 'lettuce',
          19: 'mango', 20: 'onion', 21: 'orange', 22: 'paprika', 23: 'pear', 24: 'peas', 25: 'pineapple',
          26: 'pomegranate', 27: 'potato', 28: 'raddish', 29: 'soy beans', 30: 'spinach', 31: 'sweetcorn',
          32: 'sweetpotato', 33: 'tomato', 34: 'turnip', 35: 'watermelon'}



def processed_img(img):
    # img = load_img(img_path, target_size=(224, 224, 3))
    img = img.resize((224, 224))  # Resize the image
    img = img_to_array(img)
    img = img / 255
    img = np.expand_dims(img, [0])
    answer = model.predict(img)
    y_class = answer.argmax(axis=-1)
    print(y_class)
    y = " ".join(str(x) for x in y_class)
    y = int(y)
    res = labels[y]
    print(res)
    return res.capitalize()

# print(processed_img("./assets/apple.jpeg"))


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()  # Read the file contents
    image = Image.open(BytesIO(contents))  # Convert the file contents into an image
    result = processed_img(image)  # Process the image
    return {"prediction": result}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
