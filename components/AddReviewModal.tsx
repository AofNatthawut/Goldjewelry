import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { submitReview, uploadReviewImage } from "../services/reviews";
import { Colors } from "../theme/colors";

interface AddReviewModalProps {
  visible: boolean;
  onClose: () => void;
  productId: string;
  onSuccess: () => void;
}

export default function AddReviewModal({ visible, onClose, productId, onSuccess }: AddReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("ขออภัย", "เราต้องการสิทธิ์ในการเข้าถึงรูปภาพเพื่ออัปโหลดรีวิว");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("ขออภัย", "เราต้องการสิทธิ์ในการเข้าถึงกล้องเพื่อถ่ายรูปรีวิว");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert("กรุณาใส่ข้อมูล", "รบกวนช่วยเขียนความประทับใจนิดนึงนะคะ");
      return;
    }

    try {
      setUploading(true);
      console.log("Submit button pressed. Product ID:", productId);
      let imageUrl = "";

      if (image) {
        console.log("Image selected, starting upload...");
        const uploadedUrl = await uploadReviewImage(image);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
          console.log("Image uploaded to:", imageUrl);
        } else {
          console.warn("Image upload returned null, proceeding without image.");
          // You might want to stop here if image is mandatory
        }
      }

      const { error, data } = await submitReview({
        product_id: productId,
        rating,
        comment,
        image_url: imageUrl,
        user_name: "ลูกค้าทั่วไป",
      });

      if (error) {
          console.error("SubmitReview Error:", error);
          throw error;
      }
      
      console.log("Review submission success, data:", data);

      Alert.alert("สำเร็จ", "ขอบคุณสำหรับการรีวิวนะคะ!");
      onSuccess();
      handleClose();
    } catch (error: any) {
      console.error("Catch block error:", error);
      Alert.alert(
          "เกิดข้อผิดพลาด", 
          `ไม่สามารถส่งรีวิวได้: ${error.message || JSON.stringify(error)}`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setRating(5);
    setComment("");
    setImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>เขียนรีวิวสินค้า</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Rating */}
            <View style={styles.section}>
              <Text style={styles.label}>คะแนนความพึงพอใจ</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons
                      name={star <= rating ? "star" : "star-outline"}
                      size={40}
                      color={star <= rating ? Colors.primary : Colors.border}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Photo */}
            <View style={styles.section}>
              <Text style={styles.label}>เพิ่มรูปภาพรีวิว</Text>
              <View style={styles.photoContainer}>
                {image ? (
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={{ uri: image }} 
                      style={styles.previewImage} 
                      contentFit="cover"
                    />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => setImage(null)}
                    >
                      <Ionicons name="close-circle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.photoButtonsRow}>
                    <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
                      <Ionicons name="camera" size={30} color={Colors.secondary} />
                      <Text style={styles.photoBtnText}>ถ่ายรูป</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
                      <Ionicons name="images" size={30} color={Colors.secondary} />
                      <Text style={styles.photoBtnText}>แกลเลอรี่</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Comment */}
            <View style={styles.section}>
              <Text style={styles.label}>ความคิดเห็น</Text>
              <TextInput
                style={styles.input}
                placeholder="บอกความประทับใจของคุณ..."
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, uploading && styles.disabledBtn]}
              onPress={handleSubmit}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitBtnText}>ส่งรีวิว</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: "90%",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  photoContainer: {
    alignItems: "center",
  },
  photoButtonsRow: {
    flexDirection: "row",
    gap: 20,
  },
  photoBtn: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  photoBtnText: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  imageWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  removeImageBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 12,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  submitBtn: {
    backgroundColor: Colors.secondary,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
