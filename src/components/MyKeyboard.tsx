import * as React from "react";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { View, Text } from "react-native";
import Button from "./Buttons";
import { useState } from "react";


const MyKeboard = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [operation, setOperation] = useState("");
    const [result, setResult] = useState <number | undefined> (undefined);

    const handleNumberPress = (buttonValue: string) => {
        if (firstName.length < 10) {
            setFirstName(firstName + buttonValue);
        }
    };

    const handleOperationPress = (buttonValue: string) => {
        setOperation(buttonValue);
        setSecondName(firstName);
        setFirstName("");

    }

    const clear = () => {
        setFirstName("");
        setOperation("");
        setSecondName("");
        setResult(undefined);
    }

    const getResults = () => {
        switch (operation) {
            case "+":
                clear();
                setResult(parseInt(secondName) + parseInt(firstName));
                break;
            case "-":
                clear();
                setResult(parseInt(secondName) - parseInt(firstName));
                break;
            case "*":
                clear();
                setResult(parseInt(secondName) * parseInt(firstName));
                break;
            case "/":
                clear();
                setResult(parseInt(secondName) / parseInt(firstName));
                break;
            default:
                clear();
                setResult(0);
                break;
        }
    }

    const firstNumberDisplay = () => {
        if (result !== undefined) {
            return <Text style={result < 99999 ? [Styles.screenFirstNumber, { color: myColors.result }] :
                [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}>
                {result?.toString()}
            </Text>
        }
        if (firstName && firstName.length < 6) {
            return <Text style={Styles.screenFirstNumber}>
                {firstName}
            </Text>
        }
        if(firstName === ""){
            return <Text style={Styles.screenFirstNumber} >{'0'}</Text>
        }
        if(firstName.length > 5 && firstName.length < 8){
            return <Text style={[Styles.screenFirstNumber,{fontSize:78}]} >
                {firstName}
            </Text>
        }
        if(firstName.length > 7){
            return <Text style={[Styles.screenFirstNumber,{fontSize:58}]} >
                {firstName}
            </Text>
        }
    }
    return (
        <View style={Styles.viewButton}>
            <View style={{height:120,width:'90%',justifyContent:'flex-end',alignSelf:'center'}}>
                <Text style={Styles.screenScondNumber}>
                    {secondName}
                    <Text style={{color:'purple',fontSize:50,fontWeight:'500'}}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                <Button title="%" isGray onPress={() => handleOperationPress("%")} />
                <Button title="/" isBlue onPress={() => handleOperationPress("/")} />

            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="*" isBlue onPress={() => handleOperationPress("*")} />

            </View>
            <View style={Styles.row}>

                <Button title="4" onPress={() => handleNumberPress('4')} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="=" isBlue onPress={() => handleOperationPress("=")} />
            </View>
            <View style={Styles.row}>

                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>

                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title={"\u232B"} onPress={() => setFirstName(firstName.slice(0, -1))} />
                <Button title="=" isBlue onPress={() => getResults()} />
            </View>

        </View>

    );
}
export default MyKeboard;