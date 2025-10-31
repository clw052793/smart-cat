import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

export default function SoundPage() {
  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    if (!listening) {
      Alert.alert("🎧", "開始偵測喵喵聲！");
    } else {
      Alert.alert("🛑", "停止偵測。");
    }
    setListening(!listening);
  };

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#FEF9C3" }}>
      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>🎙 聲音偵測</Text>
      <TouchableOpacity onPress={toggleListening} style={{ backgroundColor:listening ? "#FCA5A5" : "#86EFAC", padding:15, borderRadius:12, width:200, alignItems:"center" }}>
        <Text style={{ fontWeight:"600" }}>{listening ? "停止偵測" : "開始偵測"}</Text>
      </TouchableOpacity>
    </View>
  );
}
