import cv2
from cvzone.HandTrackingModule import HandDetector
from time import sleep
from PIL import ImageFont, ImageDraw, Image
import numpy as np
import cvzone
from pynput.keyboard import Controller, Key
import pyperclip  # Added for clipboard copy

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

keyboard = Controller()
finalText = ""

# Load OpenDyslexic Font
try:
    pil_font = ImageFont.truetype("OpenDyslexic-Regular.ttf", 40)
except:
    pil_font = ImageFont.truetype("arial.ttf", 40)

# Define colors
VOWEL_COLOR = (102, 204, 255)
CONSONANT_COLOR = (135, 206, 235)
BEIGE_COLOR = (245, 245, 220)
YELLOW_COLOR = (255, 255, 153)
HOVER_COLOR = (255, 255, 255)
CLICK_COLOR = (0, 255, 0)

class Button():
    def __init__(self, pos, text, size=[85, 85]):
        self.pos = pos
        self.size = size
        self.text = text

    def get_color(self):
        if self.text in ["A", "E", "I", "O", "U"]:
            return VOWEL_COLOR
        elif self.text in ["M", "D", "P"]:
            return BEIGE_COLOR
        elif self.text in ["N", "B", "Q"]:
            return YELLOW_COLOR
        elif self.text == "CLOSE":
            return (255, 100, 100)
        else:
            return CONSONANT_COLOR

# Keyboard layout
keys = [["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
        ["U", "V", "W", "X", "Y", "Z", ".", ",", ":", "/"],
        ["SPACE", "BACK", "ENTER", "CLOSE"]]

buttonList = []
for i, row in enumerate(keys):
    y = 50 + i * 100
    for j, key in enumerate(row):
        w = 200 if key in ["SPACE", "BACK", "ENTER", "CLOSE"] else 85
        x = 50 + j * (w + 10)
        buttonList.append(Button([x, y], key, [w, 85]))

# Setup hand detector
detector = HandDetector(detectionCon=0.8)

def drawAll(img, buttonList):
    for button in buttonList:
        x, y = button.pos
        w, h = button.size
        color = button.get_color()

        cv2.rectangle(img, (x, y), (x + w, y + h), color, -1)
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 0), 2)

        img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(img_pil)
        bbox = draw.textbbox((0, 0), button.text, font=pil_font)
        text_w, text_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text((x + (w - text_w) // 2, y + (h - text_h) // 2), button.text, font=pil_font, fill=(0, 0, 0))
        img = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)

        cvzone.cornerRect(img, (x, y, w, h), 20, rt=0)
    return img

cv2.namedWindow("Dyslexia-Friendly Keyboard")

def on_mouse(event, x, y, flags, param):
    global finalText
    if event == cv2.EVENT_LBUTTONDBLCLK:
        for button in buttonList:
            bx, by = button.pos
            bw, bh = button.size
            if bx < x < bx + bw and by < y < by + bh:
                if button.text == "SPACE":
                    finalText += " "
                elif button.text == "BACK":
                    finalText = finalText[:-1]
                elif button.text == "ENTER":
                    finalText += "\n"
                elif button.text == "CLOSE":
                    cap.release()
                    cv2.destroyAllWindows()
                    exit()
                else:
                    finalText += button.text

cv2.setMouseCallback("Dyslexia-Friendly Keyboard", on_mouse)

while True:
    success, img = cap.read()
    img = cv2.flip(img, 1)
    hands, img = detector.findHands(img)
    img = drawAll(img, buttonList)

    if hands:
        lmList = hands[0]['lmList']
        for button in buttonList:
            x, y = button.pos
            w, h = button.size
            if x < lmList[8][0] < x + w and y < lmList[8][1] < y + h:
                cv2.rectangle(img, (x - 5, y - 5), (x + w + 5, y + h + 5), HOVER_COLOR, 3)
                p1 = lmList[8][:2]
                p2 = lmList[4][:2]
                distance, _, _ = detector.findDistance(p1, p2, img)
                if distance < 40:
                    if button.text == "SPACE":
                        finalText += " "
                    elif button.text == "BACK":
                        finalText = finalText[:-1]
                    elif button.text == "ENTER":
                        finalText += "\n"
                    elif button.text == "CLOSE":
                        cap.release()
                        cv2.destroyAllWindows()
                        exit()
                    else:
                        finalText += button.text
                    cv2.rectangle(img, button.pos, (x + w, y + h), CLICK_COLOR, cv2.FILLED)
                    cv2.putText(img, button.text, (x + 20, y + 65), cv2.FONT_HERSHEY_PLAIN, 4, (255, 255, 255), 4)
                    sleep(0.3)

    # Draw finalText in main window
    y_offset = 500
    for line in finalText.split("\n"):
        cv2.putText(img, line, (60, y_offset), cv2.FONT_HERSHEY_PLAIN, 3, (0, 0, 0), 3)
        y_offset += 40

    # Instruction for clipboard copy
    cv2.putText(img, "Press 'C' to copy text to clipboard", (60, 460), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)

    cv2.imshow("Dyslexia-Friendly Keyboard", img)

    key = cv2.waitKey(1) & 0xFF
    if key == 27:  # ESC key to exit
        break
    elif key == ord('c') or key == ord('C'):
        pyperclip.copy(finalText)
        print("Text copied to clipboard!")

cap.release()
cv2.destroyAllWindows()


