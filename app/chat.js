import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform, StyleSheet, Alert 
} from "react-native";
import { useState, useRef, useEffect } from "react";

// ===== 配置區 =====
const SERVER_URL = "https://smart-cat-production-8d1a.up.railway.app"; // 你的 Railway URL
// ==================

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("伺服器回傳錯誤");

      const data = await res.json();
      const reply = data.reply || "斑斑暫時不想說話 😿";

      setMessages([...newMessages, { sender: "cat", text: reply }]);
      console.log("Token:", data.tokenUsed, "Cost USD:", data.costUSD, "Duration ms:", data.durationMs);

    } catch (e) {
      console.error(e);
      setMessages([...newMessages, { sender: "cat", text: "斑斑暫時不想說話 😿" }]);
      Alert.alert("錯誤", "無法連接到伺服器，請確認網路連線正常");
    } finally {
      setLoading(false);
    }
  };

  // 自動滾動到底部
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex:1, backgroundColor:"#FFF7ED" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={styles.scroll}
        ref={scrollRef}
        contentContainerStyle={{ paddingVertical:10 }}
      >
        {messages.map((m, i) => (
          <View
            key={i}
            style={[
              styles.messageBubble,
              m.sender === "user" ? styles.userBubble : styles.catBubble,
            ]}
          >
            <Text style={m.sender === "user" ? styles.userText : styles.catText}>
              {m.sender === "user" ? "你" : "斑斑"}: {m.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="跟斑斑說話..."
          style={styles.input}
          editable={!loading}
          onSubmitEditing={sendMessage} // 按 Enter 送出
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={loading}
        >
          <Text style={{ color:"#111" }}>
            {loading ? "斑斑思考中..." : "送出"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, paddingHorizontal: 10 },
  messageBubble: { maxWidth: "70%", padding: 10, borderRadius: 12, marginBottom: 8 },
  userBubble: { backgroundColor: "#DCF8C6", alignSelf: "flex-end", borderBottomRightRadius: 0 },
  catBubble: { backgroundColor: "#FDE68A", alignSelf: "flex-start", borderBottomLeftRadius: 0 },
  userText: { color: "#111" },
  catText: { color: "#111", fontWeight: "bold" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 8, borderTopWidth: 1, borderTopColor: "#EEE", backgroundColor: "#FFF7ED" },
  input: { flex: 1, borderWidth: 1, borderColor: "#CCC", borderRadius: 20, paddingHorizontal: 15, paddingVertical: Platform.OS === "ios" ? 12 : 8, marginRight: 5, backgroundColor: "#FFF" },
  sendButton: { backgroundColor: "#F59E0B", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, justifyContent: "center", alignItems: "center" },
});
