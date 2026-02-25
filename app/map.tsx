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

const MAP_DARK_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#121212" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#8e8e93" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#121212" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#1a1a1a" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#1e1e1e" }] },
  { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
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
        <View style={[styles.cardIconBox, isSelected && styles.activeCardIconBox]}>
          <Ionicons 
            name="location" 
            size={18} 
            color={isSelected ? Colors.white : Colors.primary} 
          />
        </View>
        <View style={styles.branchInfo}>
          <Text style={[styles.branchTitle, isSelected && styles.activeText]}>{item.title}</Text>
          <Text style={[styles.branchDesc, isSelected && styles.activeTextOpacity]} numberOfLines={1}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>ค้นหาสาขาใกล้คุณ</Text>
          <Text style={styles.headerSubtitle}>พบกับทองคำแท้ 96.5% ได้ที่หน้าร้านทั้ง 5 สาขา</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={MAP_DARK_STYLE}
          initialRegion={{
            latitude: 13.7563,
            longitude: 100.5018,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
        >
          {location && (
            <Marker coordinate={location}>
              <View style={styles.userMarker}>
                <View style={styles.userMarkerInner} />
              </View>
            </Marker>
          )}

          {BRANCHES.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;
            return (
              <Marker 
                key={branch.id}
                coordinate={{ latitude: branch.latitude, longitude: branch.longitude }} 
                onPress={() => handleBranchSelect(branch)}
              >
                <View style={styles.markerWrapper}>
                  {isSelected && <View style={styles.markerPulse} />}
                  <View style={[styles.storeMarker, isSelected && styles.activeStoreMarker]}>
                    <Ionicons name="diamond" size={16} color={isSelected ? Colors.white : Colors.primary} />
                  </View>
                  <View style={[styles.markerTriangle, isSelected && styles.activeMarkerTriangle]} />
                </View>
              </Marker>
            );
          })}
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
           <Text style={styles.directionBtnText}>นำทางไปยัง{selectedBranch.title.includes("สาขา") ? selectedBranch.title.split("สาขา")[1].trim() : selectedBranch.title}</Text>
           <Ionicons name="arrow-forward" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    zIndex: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.white,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 6,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    zIndex: 1,
  },
  map: { 
    flex: 1,
  },
  userMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  userMarkerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  markerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  markerPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  storeMarker: {
    width: 36,
    height: 36,
    backgroundColor: Colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  activeStoreMarker: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.white,
    transform: [{ scale: 1.1 }],
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.primary,
    marginTop: -1,
  },
  activeMarkerTriangle: {
    borderTopColor: Colors.white,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
  },
  branchList: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  branchCard: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 24,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 240,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCardIconBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeBranchCard: {
    backgroundColor: Colors.secondary,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  branchInfo: {
    marginLeft: 14,
    flex: 1,
  },
  branchTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.white,
  },
  branchDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  activeText: {
    color: Colors.white,
  },
  activeTextOpacity: {
    color: "rgba(255,255,255,0.7)",
  },
  directionBtn: {
    marginHorizontal: 20,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  directionBtnText: {
    color: Colors.white,
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
