<template>
  <v-container style="width: 50%">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Monster Sklayer!
        </h1>
        <p>
          Created with VueJS
        </p>
        <div class="pt-5">
          <v-card elevation="24">
            <h3>Player Health</h3>
            <div class="healthbar">
              <div class="healthbar__value" :style="monsterBarStyles"></div>
            </div>
          </v-card>
        </div>
        <div class="pt-5">
          <v-card elevation="24">
            <h3>Monster Health</h3>
            <div class="healthbar">
              <div class="healthbar__value" :style="playerBarStyles"></div>
            </div>
            <div>
              <v-btn color="blue" class="text-white mb-2" @click="restartGame"
                >Start A New Game</v-btn
              >
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center pt-5">
      <v-col>
        <v-btn @click="attackMonster" class="mx-5 px-10">
          Attack
        </v-btn>
        <v-btn
          :disabled="currentRoundCount"
          @click="specialAttackMonster()"
          class="mx-5 px-10"
        >
          Special Attack
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center pt-5">
      <v-col>
        <v-btn @click="healPlayer" class="mx-5 px-10">
          Heal
        </v-btn>
        <v-btn @click="surrender" class="mx-5 px-10">
          Surrender
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="my-5">
        <v-card elevation="24" v-if="winner">
          <p class="text-xl-h3 text-center">Game Over!</p>
          <p v-if="winner === 'monster'" class="text-xl-h5 text-center">
            You Lost!
          </p>
          <p v-else-if="winner === 'player'" class="text-xl-h5 text-center">
            You Won!
          </p>
          <p v-else class="text-xl-h5 text-center">
            It's a draw!
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-col class="text-center">
      <h2>Battle Log</h2>
      <v-card elevation="24">
        <v-list-item v-for="logMessage in logMessages" :key="logMessage">
          <v-list-item-content>
            <v-list-item-title>
              <span
                :class="{
                  'log--player': logMessage.actionBy === 'player',
                  'log--monster': logMessage.actionBy === 'monster',
                }"
              >
                {{ logMessage.actionBy === "player" ? "Player" : "Monster" }}
              </span>
              <span v-if="logMessage.actionType === 'heal'">
                heals for
                <span class="log--heal">
                  {{ logMessage.actionValue }}
                </span>
              </span>
              <span v-else>
                attacks and deals
                <span class="log--damage">
                  {{ logMessage.actionValue }}
                </span>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
// function getRandomValue(min, max) {
//   return (this.attackValue = Math.floor(Math.random() * (max - min)) + min);
// }
export default {
  name: "MonsterSlayer",

  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },

    currentRoundCount() {
      return this.currentRound % 3 !== 0;
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "player";
      }
    },
  },

  methods: {
    getRandomValue(min, max) {
      return (this.attackValue = Math.floor(Math.random() * (max - min)) + min);
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = this.getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage("player", "attack", attackValue);
    },

    attackPlayer() {
      const attackValue = this.getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },

    specialAttackMonster() {
      this.currentRound++;
      const attackValue = this.getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage("player", "attack", attackValue);
    },

    healPlayer() {
      this.currentRound++;
      const healValue = this.getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.addLogMessage("player", "heal", healValue);
    },

    surrender() {
      this.winner = "monster";
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #f8f4f4;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>
