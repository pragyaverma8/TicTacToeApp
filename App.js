import { StatusBar } from 'expo-status-bar';
import react from 'react';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export default function App() {

  const [notification, setNotification] = React.useState("Player X to start");
  const [refresh, setRefresh] = React.useState(false);

  const [board, setBoard] = React.useState(
    [
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ]
  );

  const [currentPlayer, setCurrentPlayer] = React.useState("X");

  const playerWon = async (symbol) => {
    setNotification("Player " + symbol + " won!");
    await delay(3000);
    setBoard(
      [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
      ]
    );
    if (symbol == "O") {
      setNotification("Player X to move");
    }
    else {
      setNotification("Player O to move");
    }
  }

  const NoPlayerWon = async () => {
    setNotification("Tie! Start the new game");
    await delay(3000);
    setBoard(
      [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
      ]
    );
    // if (symbol == "O") {
    //   setNotification("Player X to move");
    // }
    // else {
    //   setNotification("Player O to move");
    // }
  }

  const checkIfPlayerWon = () => {
    if (board[0] == board[1] && board[1] == board[2] && board[0] != " ") {
      playerWon(board[0])
    }
    else if (board[3] == board[4] && board[4] == board[5] && board[3] != " ") {
      playerWon(board[3])
    }
    else if (board[6] == board[7] && board[7] == board[8] && board[6] != " ") {
      playerWon(board[6])
    }
    else if (board[0] == board[3] && board[3] == board[6] && board[0] != " ") {
      playerWon(board[0])
    }
    else if (board[1] == board[4] && board[4] == board[7] && board[1] != " ") {
      playerWon(board[1])
    }
    else if (board[2] == board[5] && board[5] == board[8] && board[2] != " ") {
      playerWon(board[2])
    }
    else if (board[0] == board[4] && board[4] == board[8] && board[0] != " ") {
      playerWon(board[0])
    }
    else if (board[2] == board[4] && board[4] == board[6] && board[2] != " ") {
      playerWon(board[2])
    }
    else if (board[0] != " " && board[1] != " " && board[2] != " " && board[3] != " " && board[4] != " " && board[5] != " " && board[6] != " " && board[7] != " " && board[8] != " ") {
      NoPlayerWon();

    }

  }

  const pressField = (index) => {
    let newBoard = board;
    if (newBoard[index] != "X" && newBoard[index] != "O") {
      if (currentPlayer == "X") {
        newBoard[index] = "X";
        setCurrentPlayer("O");
        setNotification("Player O to move");
      }
      else {
        newBoard[index] = "O";
        setCurrentPlayer("X");
        setNotification("Player X to move");
      }

      setBoard(newBoard);
      setRefresh(!refresh);
      checkIfPlayerWon();
    }

  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/bg2.jpeg')} 
        style={styles.bgimage}
        />
      <StatusBar style="auto" />
      <Text style={styles.txt1}>TicTacToe</Text>
      <Text style={styles.txt2}>{notification}</Text>
      <TouchableOpacity
        style={styles.txtbutton}
        onPress={() => setBoard(
          [
            " ", " ", " ",
            " ", " ", " ",
            " ", " ", " "
          ]
        )}
      >
        <Text style={styles.txt3}>New Game</Text>
      </TouchableOpacity>
      <View style={styles.flatlistcontainer}>
        <Image
        source={require('./assets/board.png')} 
        style={styles.image}
        />
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({ item, index }) =>
            <TouchableOpacity style={styles.square} onPress={() => pressField(index)}>
              <Text style={styles.txtXO}>{item}</Text>
            </TouchableOpacity>
          }
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistcontainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: 50,
    color: 'black',
    position: 'absolute' ,
    top: 70,

  },
  txt2: {
    fontSize: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 4,
    color: 'white',
    position: 'absolute' ,
    top: 170 ,

  },
  txt3: {
    fontSize: 25,
  },
  txtXO: {
    fontSize: 60,

  },
  txtbutton: {
    fontSize: 30,
    padding: 10,
    backgroundColor: 'teal',
    borderRadius: 20,
    margin: 25,
    position: "absolute" ,
    bottom: 100,

  },
  list: {
    width: 300,
    height: 300,
  },
  square: {
    height: 100,
    width: 100,
    // backgroundColor: 'pink',
    justifyContent: "center",
    alignItems: "center",
  },
  image : {
    width: 300,
    height: 300,
    position: 'absolute',

  },
  bgimage: {
    position: 'absolute' ,
    zIndex: -1,
    width: '100%',
    height: '100%',

  }
});

