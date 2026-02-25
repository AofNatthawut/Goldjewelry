import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";

const BRANCHES = [
  {
    id: "1",
    latitude: 13.7410,
    longitude: 100.5080,
    title: "สาขาเยาวราช (สำนักงานใหญ่)",
    description: "ถนนเยาวราช แหล่งต้นตำรับทองคำ",
    address: "332 ถนนเยาวราช แขวงสัมพันธวงศ์ เขตสัมพันธวงศ์ กรุงเทพมหานคร 10100",
  },
  {
    id: "2",
    latitude: 13.8160,
    longitude: 100.5610,
    title: "สาขาเซ็นทรัล ลาดพร้าว",
    description: "ชั้น 2 โซนเครื่องประดับ",
    address: "1693 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
  },
  {
    id: "3",
    latitude: 13.7467,
    longitude: 100.5350,
    title: "สาขาสยามพารากอน",
    description: "ชั้น G ฝั่ง North",
    address: "991 ถนนพระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330",
  },
  {
    id: "4",
    latitude: 13.7270,
    longitude: 100.5100,
    title: "สาขาไอคอนสยาม",
    description: "ชั้น 1 โซน ICONLUXE",
    address: "299 ถนนเจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพมหานคร 10600",
  },
  {
    id: "5",
    latitude: 13.9890,
    longitude: 100.6170,
    title: "สาขาฟิวเจอร์พาร์ค รังสิต",
    description: "ชั้น 1 ใกล้โรบินสัน",
    address: "94 ถนนพหลโยธิน ตำบลประชาธิปัตย์ อำเภอธัญบุรี ปทุมธานี 12130",
  },
];

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<any>(null);
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (e) {
      console.log("Error getting location", e);
    }
  };

  const handleBranchSelect = (branch: any) => {
    setSelectedBranch(branch);
    mapRef.current?.animateToRegion({
      latitude: branch.latitude,
      longitude: branch.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    }, 1000);
  };

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.latitude},${selectedBranch.longitude}`;
    Linking.openURL(url);
  };

  const renderBranchItem = ({ item }: { item: typeof BRANCHES[0] }) => {
    const isSelected = selectedBranch.id === item.id;
    return (
      <TouchableOpacity 
        style={[styles.branchCard, isSelected && styles.activeBranchCard]}
        onPress={() => handleBranchSelect(item)}
      >
        <Ionicons 
          name="location" 
          size={20} 
          color={isSelected ? "#fff" : Colors.secondary} 
        />
        <View style={styles.branchInfo}>
          <Text style={[styles.branchTitle, isSelected && styles.activeText]}>{item.title}</Text>
          <Text style={[styles.branchDesc, isSelected && styles.activeTextOpacity]} numberOfLines={1}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 30 }]}>
        <Text style={styles.headerTitle}>ค้นหาสาขาใกล้คุณ</Text>
        <Text style={styles.headerSubtitle}>พบกับทองคุณภาพได้ที่หน้าร้านทั้ง 5 สาขา</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 13.7563,
            longitude: 100.5018,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
        >
          {location && (
            <Marker coordinate={location} title="คุณอยู่ที่นี่">
              <View style={styles.userMarker}>
                <View style={styles.userMarkerInner} />
              </View>
            </Marker>
          )}

          {BRANCHES.map((branch) => (
            <Marker 
              key={branch.id}
              coordinate={{ latitude: branch.latitude, longitude: branch.longitude }} 
              title={branch.title} 
              onPress={() => setSelectedBranch(branch)}
            >
               <View style={[styles.storeMarker, selectedBranch.id === branch.id && styles.activeStoreMarker]}>
                  <Ionicons name="storefront" size={20} color="#fff" />
               </View>
            </Marker>
          ))}
        </MapView>
      </View>

      <View style={styles.bottomOverlay}>
        <FlatList
          data={BRANCHES}
          renderItem={renderBranchItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.branchList}
        />
        
        <TouchableOpacity style={styles.directionBtn} onPress={handleNavigate}>
           <Ionicons name="navigate" size={24} color="#fff" />
           <Text style={styles.directionBtnText}>นำทางไปยัง{selectedBranch.title.split(" ")[0]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8e8e93",
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
    marginTop: -20,
    zIndex: 1,
  },
  map: { 
    flex: 1,
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0, 122, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  userMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
    borderWidth: 2,
    borderColor: "#fff",
  },
  storeMarker: {
    padding: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  activeStoreMarker: {
    backgroundColor: "#000",
    transform: [{ scale: 1.2 }],
    zIndex: 100,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingTop: 20,
  },
  branchList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  branchCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  activeBranchCard: {
    backgroundColor: Colors.secondary,
  },
  branchInfo: {
    marginLeft: 12,
  },
  branchTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
  branchDesc: {
    fontSize: 12,
    color: "#8e8e93",
    marginTop: 2,
  },
  activeText: {
    color: "#fff",
  },
  activeTextOpacity: {
    color: "rgba(255,255,255,0.8)",
  },
  directionBtn: {
    marginHorizontal: 20,
    backgroundColor: Colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  directionBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
