import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { useRandomQuestion } from "src/hooks/useQuestionsApi";

export default function App() {
    const { question, isLoading, error, refresh } = useRandomQuestion();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image style={styles.image} source={require("./assets/logo.png") as number} />
                <View style={styles.connectionContainer}>
                    <Pressable style={styles.materialButton} onPress={refresh}>
                        <Text style={styles.materialButtonText}>Test Server Connection</Text>
                    </Pressable>
                    <Text style={styles.message}>
                        {error || (isLoading ? "Loading..." : question?.text)}
                    </Text>
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
