# Manifest (매니페스트): 이끌림의 법칙 다이어트

> AI를 통해 '미래의 나'를 시각화하고, 현재의 나를 추적하여 강력한 동기부여를 제공하는 다이어트 솔루션

![Manifest UI Preview](C:/Users/io2oi/.gemini/antigravity/brain/86d3140e-cd26-47b2-b2f8-cb904dd30ba3/ghost_overlay_view_1772938064984.png)

## 🚀 프로젝트 개요 (Context)

**Manifest**는 시각적 보상과 데이터 기반의 성취감을 중시하는 다이어터를 위한 앱입니다. 사용자가 되고 싶은 '미래의 몸매'를 AI로 생성하고, 현재 신체 데이터와의 일치율($\%$)을 실시간으로 추적함으로써 다이어트 여정을 더욱 흥미롭고 강력하게 만듭니다.

## ✨ 핵심 기능 (Features)

1.  **AI Physique Generator**: 사용자의 얼굴과 목표 체형 프롬프트를 결합하여 Vertex AI(Imagen/Gemini) 기반의 고품질 이미지 생성.
2.  **Body Vision Analyzer**: MediaPipe Pose를 활용하여 사진 속 신체 주요 지점(Keypoints)을 추출하고 정량적 분석 수행.
3.  **Progress Algorithm**: 유클리드 거리를 기반으로 목표와 현재 사이의 진척도($\%$) 산출.
    $$Progress (\%) = \left( 1 - \frac{\sum |Target_{coord} - Current_{coord}|}{Total_{points}} \right) \times 100$$
4.  **Ghost Overlay UI**: 두 이미지를 투명하게 겹쳐 보여주는 비교 뷰를 통해 시각화된 변화 확인.

## 🛠 기술 스택 (Tech Stack)

*   **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript
*   **AI/ML**: Google Vertex AI, MediaPipe (Pose Detection)
*   **Language**: Python (Analyzer Core), JavaScript (Web UI)
*   **Database**: Firebase Firestore

## 📂 시작하기

### 웹 상에서 즉시 확인
현재 프로젝트 루트의 `index.html` 파일을 브라우저로 열면 UI 및 인터랙션 시뮬레이션을 즉시 확인하실 수 있습니다.

### Python 분석기 실행
신체 키포인트 추출 코드가 포함된 `vision_analyzer.py`를 실행하여 기초적인 정적 이미지 분석을 수행할 수 있습니다. (설치 필요: `pip install mediapipe opencv-python`)

---
© 2026 Manifest AI Team.