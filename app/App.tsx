import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    const DEFAULT_NGROK = process.env.EXPO_PUBLIC_DEFAULT_NGROK || "";
    const serverUrl = Platform.OS === "web" ? "http://localhost:3000" : DEFAULT_NGROK;
    const testEndpoint = "/api/test";
    const [responseMessage, setResponseMessage] = useState("Not connected");

    const testServerConnection = async () => {
        try {
            const response = await fetch(serverUrl + testEndpoint);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            const data = await response.json();
            setResponseMessage(`Server response: ${data.message}`);
        } catch (error: any) {
            setResponseMessage(`Connection failed: ${error.message}`);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image style={styles.image} source={require("./assets/logo.png")} />
                <View style={styles.connectionContainer}>
                    <Pressable style={styles.materialButton} onPress={testServerConnection}>
                        <Text style={styles.materialButtonText}>Test Server Connection</Text>
                    </Pressable>
                    <Text style={styles.message}>{responseMessage}</Text>
                </View>
                <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "70%",
        height: 100,
        resizeMode: "contain",
        marginTop: 50,
        marginBottom: 50,
        flex: 0.5,
    },
    message: {
        marginTop: 20,
        fontSize: 18,
        textAlign: "center",
        maxWidth: "80%",
    },
    prompt: {
        marginTop: 40,
        fontSize: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#AB47BC",
        color: "white",
    },

    materialButton: {
        marginTop: 24,
        backgroundColor: "#6200EE",
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 28,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    materialButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    connectionContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginBottom: 200,
    },
});
