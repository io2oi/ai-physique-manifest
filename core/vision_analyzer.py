import cv2
import mediapipe as mp
import numpy as np

# MediaPipe Pose 초기화
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

def analyze_body_keypoints(image_path):
    """
    이미지에서 신체 주요 지점(Keypoints)을 추출하고 좌표를 반환합니다.
    """
    # 이미지 로드
    image = cv2.imread(image_path)
    if image is None:
        print(f"Error: Could not read image at {image_path}")
        return None

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # 신체 감지 수행
    results = pose.process(image_rgb)

    if not results.pose_landmarks:
        print("No pose landmarks detected.")
        return None

    # 모든 랜드마크 추출 (33개 포인트)
    landmarks = results.pose_landmarks.landmark
    
    # 주요 지점 추출 (어깨, 엉덩이, 무릎 등)
    # Manifest Progress Algorithm에 사용될 핵심 지점들
    key_points = {
        "LEFT_SHOULDER": landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER],
        "RIGHT_SHOULDER": landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER],
        "LEFT_HIP": landmarks[mp_pose.PoseLandmark.LEFT_HIP],
        "RIGHT_HIP": landmarks[mp_pose.PoseLandmark.RIGHT_HIP],
        "LEFT_KNEE": landmarks[mp_pose.PoseLandmark.LEFT_KNEE],
        "RIGHT_KNEE": landmarks[mp_pose.PoseLandmark.RIGHT_KNEE]
    }

    # 좌표 출력 시뮬레이션
    print("\n--- Detected Keypoints (Normalized Coordinates) ---")
    for name, point in key_points.items():
        print(f"{name}: (x: {point.x:.4f}, y: {point.y:.4f}, visibility: {point.visibility:.4f})")

    # 결과 시각화 및 저장
    annotated_image = image.copy()
    mp_drawing.draw_landmarks(
        annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
    
    output_path = "analyzed_result.jpg"
    cv2.imwrite(output_path, annotated_image)
    print(f"\nAnnotated image saved as: {output_path}")

    return key_points

if __name__ == "__main__":
    # 사용 예시: 실제 이미지 파일 경로를 넣어 테스트하세요.
    # analyze_body_keypoints("your_photo.jpg")
    print("MediaPipe Pose Analyzer 준비 완료.")
    print("사용법: analyze_body_keypoints('이미지_경로.jpg')를 호출하세요.")
