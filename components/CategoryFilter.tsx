import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { Colors } from "../theme/colors";

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((category: any) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.chip, selected === category.id && styles.chipActive]}
          onPress={() => onSelect(category.id)}
        >
          <Text
            style={[
              styles.chipText,
              selected === category.id && styles.chipTextActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#000", // Black text on gold background looks better
    fontWeight: "bold",
  },
});
