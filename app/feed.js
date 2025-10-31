import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Notifications from "expo-notifications";

export default function FeedPage() {
  const scheduleFeed = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("⚠️", "請允許通知權限");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🐱 該餵斑斑囉！",
        body: "別忘了準備牠最愛的小魚乾！",
      },
      trigger: { seconds: 10 },
    });

    Alert.alert("✅", "餵食提醒已設定（10秒後測試）");
  };

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#E0F2FE" }}>
      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>🍽 餵食提醒</Text>
      <TouchableOpacity onPress={scheduleFeed} style={{ backgroundColor:"#93C5FD", padding:15, borderRadius:12, width:200, alignItems:"center" }}>
        <Text style={{ fontWeight:"600" }}>設定餵食時間</Text>
      </TouchableOpacity>
    </View>
  );
}
