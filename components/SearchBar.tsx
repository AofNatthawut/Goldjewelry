import { TextInput } from "react-native";
import { Colors } from "../theme/colors";

export default function SearchBar({ value, onChange }: any) {
  return (
    <TextInput
      placeholder="ค้นหาราคา..."
      placeholderTextColor={Colors.textSecondary}
      value={value}
      onChangeText={onChange}
      style={{
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: Colors.card,
        color: Colors.text,
      }}
    />
  );
}
