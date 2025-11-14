import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import HomePage from "src/pages/HomePage";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <HomePage />
                <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
