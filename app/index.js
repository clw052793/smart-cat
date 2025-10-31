import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#FFFDF7" }}>
      <Image source={require("../assets/images/cat.png")} style={{ width:180, height:180, marginBottom:20 }} />
      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:10 }}>🐾 歡迎來到斑斑的智慧電子貓！</Text>
      <Text style={{ color:"#666", marginBottom:30 }}>監測聲音、設定餵食、互動陪伴</Text>

      <Link href="/sound" asChild>
        <TouchableOpacity style={{ backgroundColor:"#FCD34D", padding:15, borderRadius:12, width:200, alignItems:"center", marginBottom:10 }}>
          <Text style={{ fontWeight:"600" }}>🎙 聲音偵測</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/feed" asChild>
        <TouchableOpacity style={{ backgroundColor:"#93C5FD", padding:15, borderRadius:12, width:200, alignItems:"center" }}>
          <Text style={{ fontWeight:"600" }}>🍽 餵食提醒</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/chat" asChild>
        <TouchableOpacity style={{ backgroundColor:"#F9A8D4", padding:15, borderRadius:12, width:200, alignItems:"center", marginTop:10 }}>
          <Text style={{ fontWeight:"600" }}>💬 AI 聊天</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
