/*
  v0.9 
  - Adicionado Game Changes card: agora o esquema do requirement da full pokedex é toggleable, além do lance de começar todas as quests automaticamente (caso queira jogar totalmente vanilla).

  v0.8
  - UI overhaul! Agora os checkboxes de toggle possuem cards próprios no dashboard
  - Adicionado card de shinies e progresso de shinies
  - Adicionado Super de Quico! no card de shortcuts
  - Adicionado card de hotkeys, com todas listadas

  v0.7
  - Agora hotkey `r` reseta quest E starta as quests
  - hotkey do Super de Quico! foi alterada pra `j`, pra não conflitar com a hotkey dos oak items
  - Pokedex tem hotkey `e` agora
 
  v0.6.1
  - Consertado o bug onde as hotkeys pegam quando um input tá focado

  v0.6
  - Auto achievements de rotas e gyms! Novos checkbox. Ordena os achievements pelo volume de requisitos.

  v0.5
  - Eventos baseados em tempo baseados no toogle do checkbox: Flying Pikachu, Mewtwo Strikes back, Merry Christmas, Halloween e Lets Go Pikachu

  v0.4 
  - SUPER DE QUICO! Loja com todos o items. Aperte o para abrir 
  - a hotkey de `q` pra sair da dungeon foi alterada para `l` por uma questão de ergonomia

  v0.3
  - mais atalhos: k vai direto pro pokemon chefe, q sai da dungeon, v usa survey, b skip underground
  - auto breeder roda mais rápido agora

  v0.2
  - adiciona vários atalhos: 
  f abre farm
  m o shopping
  u underground
  g solta bomba
  h abre o breeding controller
  r reseta quests
  t starta todas as quests
  z abre o navio

  v0.1
  - primeira versão com os checkbox tudo
*/


/* SUPER DE QUICO */
let pppSettings = {
  startEveryQuest: false,
}

let SuperDeQuicoShop = new Shop([
  ItemList['Pokeball'],
  ItemList['Greatball'],
  ItemList['Ultraball'],

  ItemList['xAttack'],
  ItemList['xClick'],
  ItemList['Lucky_egg'],
  ItemList['Item_magnet'],
  ItemList['Token_collector'],
  ItemList['Lucky_incense'],
  ItemList['SmallRestore'],
  ItemList['MediumRestore'],
  ItemList['LargeRestore'],

  ItemList['Explorer_kit'],
  ItemList['Explosive_Charge'],
  ItemList['Treasure_Scanner'],
  ItemList['Dungeon_ticket'],

  ItemList['Mystery_egg'],
  ItemList['Water_egg'],
  ItemList['Electric_egg'],
  ItemList['Fighting_egg'],
  ItemList['Dragon_egg'],
  ItemList['Fire_egg'],
  ItemList['Grass_egg'],

  ItemList['Water_stone'],
  ItemList['Thunder_stone'],
  ItemList['Leaf_stone'],
  ItemList['Moon_stone'],
  ItemList['Trade_stone'],
  ItemList['Fire_stone'],

  ItemList['Kings_rock'],
  ItemList['Sun_stone'],
  ItemList['Upgrade'],
  ItemList['Soothe_bell'],
  ItemList['Metal_coat'],
  ItemList['Dragon_scale'],
  ItemList['Prism_scale'],
  ItemList['Deepsea_tooth'],
  ItemList['Deepsea_scale'],
  ItemList['Dawn_stone'],
  ItemList['Dusk_stone'],
  ItemList['Shiny_stone'],
  ItemList['Electirizer'],
  ItemList['Magmarizer'],
  ItemList['Reaper_cloth'],
  ItemList['Dubious_disc'],
  ItemList['Protector'],
  ItemList['Sachet'],
  ItemList['Whipped_dream'],
  ItemList['Ice_stone'],
  ItemList['Razor_claw'],
  ItemList['Razor_fang'],

  ItemList['Eevee'],
  ItemList['Porygon'],
  ItemList['Jynx'],
  ItemList['Mr. Mime'],
  ItemList['Lickitung'],
  ItemList['Togepi'],

  ItemList['Beldum'],
  ItemList['Sprinklotad'],
  ItemList['Spiritomb'],
  ItemList['Combee'],
  ItemList['Burmy (plant)'],
  ItemList['Cherubi'],
  ItemList['Skorupi'],
  ItemList['Zorua'],
  ItemList['Meloetta (pirouette)'],

  ItemList['Boost_Mulch'],
  ItemList['Rich_Mulch'],
  ItemList['Surprise_Mulch'],
  ItemList['Amaze_Mulch'],
  ItemList['Berry_Shovel'],
  ItemList['Squirtbottle'],

  new PokeballItem(GameConstants.Pokeball.Ultraball, 1, GameConstants.Currency.battlePoint),
  new PokeballItem(GameConstants.Pokeball.Masterball, 500, GameConstants.Currency.battlePoint , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.battlePoint]}` }),
  new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 10, GameConstants.Currency.battlePoint),
  new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 20, GameConstants.Currency.battlePoint),
  new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 40, GameConstants.Currency.battlePoint),

  new PokeballItem(GameConstants.Pokeball.Masterball, 10000000, GameConstants.Currency.money       , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.money]}` }),
  new PokeballItem(GameConstants.Pokeball.Masterball, 75000   , GameConstants.Currency.dungeonToken, { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.dungeonToken]}` }),
  new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.questPoint  , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.questPoint]}` }),
  new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.farmPoint   , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.farmPoint]}` }),
  new PokeballItem(GameConstants.Pokeball.Masterball, 50      , GameConstants.Currency.diamond     , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.diamond]}` }),

  ItemList['Protein'],

], 'Super de Quico!');

['#ppp-toggles', '#ppp-shinies', '#ppp-hotkeys', '#ppp-gamechanges'].forEach(cardId => {
  if(cardEl = document.querySelector(cardId)) cardEl.parentElement.removeChild(cardEl)
})

document.querySelector('#left-column').insertAdjacentHTML('beforeend', `

  <div id="ppp-toggles" class="card sortable border-secondary mb-3" >
    <div class="card-header p-0" data-toggle="collapse" href='#ppp-togglesBody' aria-expanded="false" >
      <span>[p++] Auto Toggles</span>
    </div>
    
    <div  class="card-body p-0 collapse" id='ppp-togglesBody' style="max-height: 350px; overflow: auto" >
      <div class="row m-0" >
        <div class="col-12 p-0">
          <div class="content">
            <div id="pokepp">
              <table class="table table-striped table-hover m-0 p-0">
                <tbody class="p-0">
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="Auto Click" value="1" id="autoClick">
                    </td>
                    <td>
                      <label for="autoClick">Auto Click</label>
                    </td>
                  </tr>
                  
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="Auto Breed" value="1" id="autoBreed">
                    </td>
                    <td>
                      <label for="autoBreed">
                        Auto Breed
                      </label>
                    </td>
                  </tr>
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="Auto Berry" value="1" id="autoBerry">
                    </td>
                    <td>
                      <label for="autoBerry">
                        Auto Berry
                      </label>
                    </td>
                  </tr>
                  
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="Auto Gym" value="1" id="autoGym">
                    </td>
                    <td>
                      <label for="autoGym">
                        Auto Gym
                      </label>
                    </td>
                  </tr>
                  
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="Auto Use Small Energy " value="1" id="autoUseSmallEnergy">
                    </td>
                    <td>
                      <label for="autoUseSmallEnergy">
                        Auto Use Small Energy
                      </label>
                    </td>
                  </tr>
                  
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="toggleEvents" value="1" id="toggleEvents">
                    </td>
                    <td>
                      <label for="toggleEvents">
                        Toggle Special Events
                      </label>
                    </td> 
                  </tr>
                  
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="routeAchievementCompletionist" value="1" id="routeAchievementCompletionist">
                    </td>
                    <td>
                      <label for="routeAchievementCompletionist">
                        Auto Achievement Completionist (routes)
                      </label>
                    </td>
                  </tr>
                  <tr width="100%" class='text-left'>
                    <td>
                      <input type="checkbox" name="gymAchievementCompletionist" value="1" id="gymAchievementCompletionist">
                    </td>
                    <td>
                      <label for="gymAchievementCompletionist">
                        Auto Achievement Completionist (gyms)
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="ppp-gamechanges" class="card sortable border-secondary mb-3" >
    <div class="card-header p-0" data-toggle="collapse" href='#ppp-gameChanges' aria-expanded="false" >
      <span>[p++] Game Changes</span>
    </div>
    
    <div  class="card-body p-0 collapse" id='ppp-gameChanges' style="max-height: 350px; overflow: auto" >
      <div class="row m-0" >
        <div class="col-12 p-0">
          <div class="content">
            <table class="table table-striped table-hover m-0 p-0">
              <tbody class="p-0">
                <tr width="100%" class='text-left'>
                  <td>
                    <input type="checkbox" name="" value="1" id="removeFullPokedexRequirement">
                  </td>
                  <td>
                    <label for="removeFullPokedexRequirement">Remove full Pokédex requirement to go to next region (might need to visit a route then a city in order to work)</label>
                  </td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>
                    <input type="checkbox" name="" id="startEveryQuest">
                  </td>
                  <td>
                    <label for="startEveryQuest">Start every quest, ignoring Quest Level</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="ppp-shinies" class="card sortable border-secondary mb-3" >
    <div class="card-header p-0" data-toggle="collapse" href='#ppp-shiniesBody' aria-expanded="false" >
    <span>[p++] Shinies (<span class='m-0 p-0' id='ppp-shiniesCount'></span>✨
      /
      <span class='m-0 p-0' id='ppp-shiniesTotalCount'></span>)</span>
    </div>
    
    <div  class="card-body p-0 collapse" id="ppp-shiniesBody">
      <div class="row m-0" >
        <div class="col-12 p-0">
          <div class="content">
          
            <table class="table table-striped table-hover m-0 p-0">
              <tbody class="p-0">
                <tr class="text-center">
                  <td>Shiny Progress ✨</td>
                </tr>
                <tr>
                  <td  class="p-0">
                    <div class="progress p-0">
                      <div id='ppp-shiniesProgressBar' class="progress-bar bg-success" role="progressbar" aria-valuemax="100" style="width:0%">
                        <span id='ppp-shiniesProgressBarSpan'></span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="ppp-hotkeys" class="card sortable border-secondary mb-3" >
    <div class="card-header p-0 table-responsive" data-toggle="collapse" href='#ppp-hotkeysBody' aria-expanded="false" >
    <span>[p++] Hotkeys</div>
    
    <div class="card-body p-0 collapse" id="ppp-hotkeysBody" style="max-height: 350px; overflow: auto">
      <div class="row m-0" >
        <div class="col-12 p-0">
          <div class="content">
            <table class="table table-striped table-hover m-0 p-0">
              <tbody class="p-0">
                <tr width="100%" class='text-left'>
                  <td>e</td>
                  <td>Open Pokédex</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>r</td>
                  <td>Buy quest refresh</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>u</td>
                  <td>Open Underground</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>f</td>
                  <td>Open Farm</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>g</td>
                  <td>Bomb Mine</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>h</td>
                  <td>Open Breeding Modal</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>k</td>
                  <td>Go Straight to Dungeon Boss</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>l</td>
                  <td>Quit Boss</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>z</td>
                  <td>Open Docks</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>v</td>
                  <td>Survey</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>b</td>
                  <td>Skip Layer</td>
                </tr>
                <tr width="100%" class='text-left'>
                  <td>m</td>
                  <td>Open Poké Mart</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
`)


/* FIM DO SUPER DE QUICO ok oficialmente preciso duma extensão */
let intervals = []
let insertCustomCheckbox = ({ title, intervalIndex, callback, miliseconds, checkboxId }) => {
  let interval = intervals[intervalIndex]
  checkboxEl = document.querySelector(`#${checkboxId}`);
  
  checkboxEl.addEventListener('click', () => {
    let _checked = document.querySelector(`#${checkboxId}`).checked
    if (_checked) {
      interval = setInterval(callback, miliseconds)
    } else {
      clearInterval(interval);
    }
  });
}

// callbacks 
let autoClickCallback = () => {
  if (App.game.gameState === GameConstants.GameState.fighting ) Battle.clickAttack();
  if (App.game.gameState === GameConstants.GameState.gym) GymBattle.clickAttack();
  if (Safari.inBattle()) BattleFrontierBattle.clickAttack();
  if (App.game.gameState === GameConstants.GameState.dungeon) DungeonRunner.handleClick();
}

let autoBreedCallback = () => {
  let canHatchPokemon = App.game.breeding.hasFreeEggSlot() 
  let firstPokemonOfList = App.game.party.caughtPokemon.find(item => BreedingController.visible(item)());
  [0, 1, 2, 3].forEach(index => App.game.breeding.hatchPokemonEgg(index));

  if (canHatchPokemon) 
    App.game.breeding.addPokemonToHatchery(firstPokemonOfList)
}
let autoBerryCallback = () => {
  App.game.farming.harvestAll()
  App.game.farming.plantAll(FarmController.selectedBerry())
}

let autoGymCallback = () => {
  if(App.game.gameState != GameConstants.GameState.gym)
    GymRunner.startGym(player.town().gym)
}

let autoUseSmallEnergyCallback = () => {
  if(App.game.underground.energy != App.game.underground.getMaxEnergy()) 
    ItemList['SmallRestore'].use()
}


insertCustomCheckbox({
  title: 'Auto Click', 
  intervalIndex: 'autoClick', 
  callback: autoClickCallback,
  miliseconds: 50,
  checkboxId: 'autoClick'
})
 
insertCustomCheckbox({
  title: 'Auto Breed', 
  intervalIndex: 'autoBreed', 
  callback: autoBreedCallback,
  miliseconds: 200,
  checkboxId: 'autoBreed'
})

insertCustomCheckbox({
  title: 'Auto Berry', 
  intervalIndex: 'autoBerry', 
  callback: autoBerryCallback,
  miliseconds: 2000,
  checkboxId: 'autoBerry'
})
  
insertCustomCheckbox({
  title: 'Auto Gym', 
  intervalIndex: 'autoGym', 
  callback: autoGymCallback,
  miliseconds: 30,
  checkboxId: 'autoGym',
})
  
insertCustomCheckbox({
  title: 'Auto Use Small Energy ', 
  intervalIndex: 'autoUseSmallEnergy', 
  callback: autoUseSmallEnergyCallback,
  miliseconds: 30,
  checkboxId: 'autoUseSmallEnergy',
})

insertRefreshQuestStuff = () => {
  let refreshContainer = document.querySelector('#refreshQuests')
  let beginQuestElement = document.createElement('SPAN')
  beginQuestElement.id = 'beginAllQuestButton'
  beginQuestElement.style.display = 'none' // we start hidden because now its a setting
  beginQuestElement.innerHTML = 'Begin All Quests (reseta teu progresso atual)'
  beginQuestElement.addEventListener('click', () => {
    App.game.quests.questList().forEach(quest => quest.begin())
  })
  refreshContainer.appendChild(beginQuestElement)
}
insertRefreshQuestStuff()

insertEventStuff = () => {
  checkboxEl = document.querySelector(`#toggleEvents`);
  
  checkboxEl.addEventListener('click', () => {
    let _checked = document.querySelector(`#toggleEvents`).checked
    if (_checked) {
      SpecialEvents.events.forEach(event => {
        event.backupStartTime = event.startTime
        event.backupEndTime = event.endTime
        event.startTime = new Date('2021-01-01')
        event.endTime = new Date('2021-12-31')
        event.start()
      })
    } else {
      SpecialEvents.events.forEach(event => {
        event.startTime = event.backupStartTime
        event.endTime = event.backupEndTime
        event.end()
      })
    }
  });
}
insertEventStuff()


insertNewHotkeys = () => {
  document.onkeypress = function (e) {
    e = e || window.event;
    if(GameController.focusedOnEditableElement()) 
      return true
    // teclas usadas: q w r t u 
    //                a s d f g h k
    //                z x v b m
    if (e.key == 'e') document.querySelector(`[href='#pokedexModal']`).click()
    if (e.key == 'r' && App.game.quests.canAffordRefresh()) {
      App.game.quests.refreshQuests(false, true)
      if (settings.startEveryQuest) 
        App.game.quests.questList().forEach(quest => quest.begin())
    }
    // if (e.key == 't') 
    if (e.key == 'u') App.game.underground.openUndergroundModal()
    
    if (e.key == 'f') FarmController.openFarmModal()
    if (e.key == 'g') Mine.bomb()
    if (e.key == 'h') BreedingController.openBreedingModal();
    if (e.key == 'k' && !DungeonRunner.fightingBoss()) {
      // ainda é ligeralmente explorável
      DungeonRunner.fightingBoss(true);
      DungeonBattle.generateNewBoss();
    }
    if (e.key == 'j') document.querySelector('#openSuperDeQuicoShop').click()
    if (e.key == 'l' && App.game.gameState == GameConstants.GameState.dungeon) {
      DungeonRunner.dungeonFinished(true);
      DungeonRunner.fighting(false);
      DungeonRunner.defeatedBoss(false);
      DungeonRunner.fightingBoss(false);
      MapHelper.moveToTown(DungeonRunner.dungeon.name);
    }

    if (e.key == 'z') MapHelper.openShipModal()
    if (e.key == 'v') Mine.survey()
    if (e.key == 'b') Mine.skipLayer(false)
    // pokemarket
    if (e.key == 'm') document.querySelector("#shortcutsBody > table > tbody > tr:nth-child(3) > td > button").click()
    
  };
}
insertNewHotkeys()


let compare = (a, b) => {
  if ( a.property.requiredValue < b.property.requiredValue ){
    return -1;
  }
  if ( a.property.requiredValue > b.property.requiredValue ){
    return 1;
  }
  return 0;
}
insertAutoRouteCompletionistStuff = () => {
  
  checkboxEl = document.querySelector(`#routeAchievementCompletionist`);

  checkboxEl.addEventListener('click', () => {
    let _checked = document.querySelector(`#routeAchievementCompletionist`).checked
    if (_checked) {
      AchievementHandler.filter.type(15)
      AchievementHandler.filter.status(0)

      let achievements = AchievementHandler.achievementListFiltered()
      // achievements.sort(compare)

      let achievementIndex = 0
      achievementInterval = setInterval(() => {
        let achievement = achievements[achievementIndex]
        let { route, region } = achievement.property
        
        MapHelper.moveToRoute(route, region)
        App.game.achievementTracker.trackAchievement(achievement)

        if (achievement.isCompleted()) 
          achievementIndex++
        
        if (achievementIndex >= achievements.length)
          clearInterval(achievementInterval)
      }, 3000)
    } else {
      clearInterval(achievementInterval)
    }
  });
}
insertAutoRouteCompletionistStuff()


insertAutoGymCompletionistStuff = () => {

  let watchGymStatus = () => {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if(App.game.gameState != GameConstants.GameState.gym) {
          resolve()
        }
      }, 200)
    })
  }

  checkboxEl = document.querySelector(`#gymAchievementCompletionist`);
  
  checkboxEl.addEventListener('click', () => {
    let _checked = document.querySelector(`#gymAchievementCompletionist`).checked
    if (_checked) {
      AchievementHandler.filter.type(16)
      AchievementHandler.filter.status(0)
      let gyms = GameConstants.RegionGyms.flat()
      let achievements = AchievementHandler.achievementListFiltered()
      // achievements.sort(compare)

      let achievementIndex = 0

      let achievementInterval = async () => {
        let achievement = achievements[achievementIndex]
        let { gymIndex } = achievement.property
        // olha o tamanho dessa volta
        let gymTownName = gymList[gyms[gymIndex]].town 
        MapHelper.moveToTown(gymTownName)
        
        App.game.achievementTracker.trackAchievement(achievement)

        if(!player.town().gym) {
          GymRunner.startGym(player.town().gymList.find(item => item.leaderName == gymList[gyms[gymIndex]].leaderName))
        } else {
          GymRunner.startGym(player.town().gym)
        }
        await watchGymStatus()
        

        if (achievement.isCompleted()) {
          achievementIndex++
        }
        
        if (achievementIndex >= achievements.length) {
          return
        }
        else if (document.querySelector(`#gymAchievementCompletionist`).checked)
          achievementInterval()
        
      }

      achievementInterval()
    } 
  });
}
insertAutoGymCompletionistStuff()

let shinyStuff = () => {
  let getCaughtPokemonsLength = ({ lookForShiny } = { lookForShiny: false }) => {
    let pokemons = PokedexHelper.getList().filter(item => App.game.party.alreadyCaughtPokemon(item.id, lookForShiny))
    return pokemons.length
  }

  let shiniesWatch = null
  let shiniesProgressBarWatch = null
  clearInterval(shiniesWatch)
  clearInterval(shiniesProgressBarWatch)
  
  shiniesCounterUpdateValue = () => {
    let shiniesCountEl = document.querySelector('#ppp-shiniesCount')
    let shiniesTotalCountEl = document.querySelector('#ppp-shiniesTotalCount')

    shiniesCountEl.innerHTML = getCaughtPokemonsLength({ lookForShiny: true })
    shiniesTotalCountEl.innerHTML = getCaughtPokemonsLength()
  }
  
  shiniesProgressUpdateValue = () => {
    let shiniesProgressBarEl = document.querySelector('#ppp-shiniesProgressBar')
    let shiniesProgressBarSpanEl = document.querySelector('#ppp-shiniesProgressBarSpan')
    
    let percentage = (
      getCaughtPokemonsLength({ lookForShiny: true }) / getCaughtPokemonsLength() * 100
    ).toFixed(2)
    
    shiniesProgressBarEl.style.width = `${percentage}%`
    shiniesProgressBarSpanEl.innerHTML = `
      ${getCaughtPokemonsLength({ lookForShiny: true })}/${getCaughtPokemonsLength()} (${percentage}%)
    `
      
  }

  shiniesProgressUpdateValue()
  shiniesProgressBarWatch = setInterval(shiniesProgressUpdateValue, 2 * 1000)
  
  shiniesCounterUpdateValue()
  shiniesWatch = setInterval(shiniesCounterUpdateValue, 2 * 1000)
}
shinyStuff()

insertSuperDeQuicoButton = () => {
  document.querySelector('#shortcutsContainer tbody').insertAdjacentHTML('beforeend', `
    <tr>
      <td class="p-0">
        <button id="openSuperDeQuicoShop" onclick="ShopHandler.showShop(SuperDeQuicoShop)" href="#shopModal" data-toggle="modal" class="btn btn-block btn-primary m-0">
          [p++] Super de Quico!
        </button>
      </td>
    </tr>
  `)
}

insertSuperDeQuicoButton()

insertGameChangeStuff = () => {

  let customAbleToTravel = () => {
    if (player.highestRegion() >= GameConstants.MAX_AVAILABLE_REGION) {
      return false;
    }

    let requirement
    switch (player.highestRegion()) {
      case GameConstants.Region.kanto:
        requirement = new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion);
        break;
      case GameConstants.Region.johto:
        requirement = new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion);
        break;
      case GameConstants.Region.hoenn:
        requirement = new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion);
        break;
      case GameConstants.Region.sinnoh:
        requirement = new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion);
        break;
      case GameConstants.Region.unova:
        requirement = new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion);
        break;
      case GameConstants.Region.kalos:
        requirement = new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion);
        break;
    }
    if (!requirement) {
        console.error('Error: Region Travel Requirement not found.');
        return false;
    }
    return requirement.isCompleted();
  }
  let originalAbleToTravel = MapHelper.ableToTravel

  document.querySelector('#removeFullPokedexRequirement').addEventListener('change', (e) => {
    
    if (e.target.checked) 
      MapHelper.ableToTravel = customAbleToTravel

    else 
      MapHelper.ableToTravel = originalAbleToTravel
  })

  document.querySelector('#startEveryQuest').addEventListener('change', (e) => {
    pppSettings.startEveryQuest = e.target.checked
    toggleStartQuestVisibility(pppSettings['startEveryQuest'])
  })

  toggleStartQuestVisibility = (startEveryQuest) => 
    document.querySelector('#beginAllQuestButton').style.display = (startEveryQuest) ? 'inline-block' : 'none'


}
insertGameChangeStuff()