## Terraformer's Dilemma    2024    Joni Laari

class GameState:
    def __init__(self):
        self.population = Population()
        self.resources = Resources()
        self.environment = Environment()
        self.game_over = False
        self.turn = 0
         
    def update(self):
        self.population.update()
        self.resources.update()
        self.environment.update()
        self.check_game_conditions()
        self.turn += 1
        
    def check_game_conditions(self):
        ## Define conditions for gameover and success
        if self.environment.quality < 0 or self.resources.total < 0:
                self.game_over = True