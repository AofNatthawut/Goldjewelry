import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../theme/colors";

export default function SearchBar({ value, onChange }: any) {
  const onClear = () => onChange("");

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.primary} style={styles.searchIcon} />
      <TextInput
        placeholder="ค้นหาชื่อ, ราคา, หรือน้ำหนัก..."
        placeholderTextColor="rgba(255,255,255,0.4)"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        selectionColor={Colors.primary}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
          <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.4)" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: "rgba(212, 175, 55, 0.4)",
    height: 52,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  clearBtn: {
    padding: 5,
  },
});
