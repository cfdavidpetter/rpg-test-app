const apiurl = `${process.env.__APP_URL__}/api`;

export const apiEndpoint = {
  Players: `${apiurl}/players`,
  Guilds: `${apiurl}/guilds`,
  Session: `${apiurl}/session`,
};


export const playerClass = {
  WARRIOR: 'Guerreiro',
  MAGE: 'Mago',
  ARCHER: 'Arqueiro',
  CLERIC: 'Clérigo',
}