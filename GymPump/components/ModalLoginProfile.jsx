import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModalLoginProfile = ({ open, data, login }) => {
    const snapPoint = useMemo(() => ['20%'], []);

    const [dataProfile, setDataProfile] = useState(data || []);

    useEffect(() => {
        setDataProfile(data || []);
    }, [data]);

    return (
        <BottomSheet
            ref={open}
            index={-1}
            snapPoints={snapPoint}
            backgroundStyle={{ backgroundColor: '#31346c' }}
            enablePanDownToClose={true}
        >
            <View style={{padding: 20}}>
                <View style={styles.containerProfile}>
                    {dataProfile && dataProfile.length > 0 ? (
                        <>
                            <View style={styles.containerIcon}>
                                <View style={{backgroundColor: 'white', borderRadius: 100, width: 40, height: 40}}></View>
                                <Text style={{fontSize :15, color: 'white'}}>{dataProfile[0].nome}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>login(dataProfile[1])} style={styles.btn}>
                                <Text style={{color: 'white'}}>Entrar</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text>Dados não disponíveis</Text>
                    )}
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    containerProfile: {
        backgroundColor: '#0c0d17',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5
    },
    containerIcon: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 20
    },
    btn: {
        backgroundColor: '#31346c', 
        padding: 10,
        borderRadius: 10
    }
});

export default ModalLoginProfile;
