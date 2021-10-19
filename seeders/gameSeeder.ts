import { GameInstance } from '../models';

const gameData = [
  {
    gameName: 'KINGDOM HEARTS HD 2.8 Final Chapter Prologue',
    gamePoster:
      'https://cdn1.epicgames.com/c8ff067c1c984cd7ab1998e8a9afc8b6/offer/EGS_KINGDOMHEARTSHD28FinalChapterPrologue_SquareEnix_S6-1200x1600-a3fc8fc218fe1ff3541dc2b5b9f076d7.jpg?h=854&resize=1&w=640',
    gameTrailer: 'https://www.youtube.com/embed/4gKAR0uRZZ0',
    gameDescription: `KINGDOM HEARTS Dream Drop Distance HD: A full-HD remaster. Sora and Riku take on the Mark of Mastery exam in preparation for their coming showdown with Master Xehanort.
    KINGDOM HEARTS χ Back Cover (movie): A new HD movie that tells the mysterious story of the Foretellers from the series’ origins
    KINGDOM HEARTS 0.2 Birth by Sleep – A fragmentary passage – : A brand new episode that links to KINGDOM HEARTS III.
    ※The "Languages Supported" section was revised on April 13, 2021.`,
    releaseDate: '2021-03-30',
    PublisherInstanceId: 1,
    DeveloperInstanceId: 1,
    FeatureInstanceId: 1,
    GenreInstanceId: 4,
  },
  {
    gameName: 'NBA 2K21',
    gamePoster:
      'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_NBA2K21_VisualConcepts_S2_1200x1600-2fed3198782328f4f59194ebd5e54680?h=854&resize=1&w=640',
    gameTrailer: 'https://www.youtube.com/embed/RJ_bxl5DwkM',
    gameDescription: `Embark on your own personal, cinematic basketball journey to reach your ultimate destination: the National Basketball Association. Build up your custom MyPLAYER and take him to the heights of their career and stardom, and make a name for yourself in the global basketball universe.`,
    releaseDate: '2020-09-04',
    PublisherInstanceId: 2,
    DeveloperInstanceId: 2,
    FeatureInstanceId: 1,
    GenreInstanceId: 5,
  },
  {
    gameName: 'Red Dead Redemption 2',
    gamePoster:
      'https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=854&resize=1&w=640',
    gameTrailer: 'https://www.youtube.com/embed/eaW0tYpxyp0',
    gameDescription: `Includes Red Dead Redemption 2: Story Mode and Red Dead Online.
    Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age.
    America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.
    Red Dead Redemption 2 also includes the shared living world of Red Dead Online – forge your own path as you battle lawmen, outlaw gangs and ferocious wild animals to build a life on the American frontier. Build a camp, ride solo or form a posse and explore everything from the snowy mountains in the North to the swamps of the South, from remote outposts to busy farms and bustling towns. Chase down bounties, hunt, fish and trade, search for exotic treasures, run your own underground Moonshine distillery, or become a Naturalist to learn the secrets of the animal kingdom and much more in a world of astounding depth and detail – includes all new features, gameplay content and additional enhancements released since launch.`,
    releaseDate: '2019-11-05',
    PublisherInstanceId: 4,
    DeveloperInstanceId: 4,
    FeatureInstanceId: 1,
    GenreInstanceId: 2,
  },
  {
    gameName: `Assassin's Creed Origins`,
    gamePoster:
      'https://cdn1.epicgames.com/undefined/offer/S2_ACOD-1280x1440-621a727d381ffe0cffe869c1e23bc741.jpg?h=854&resize=1&w=640',
    gameTrailer: 'https://www.youtube.com/embed/cK4iAjzAoas',
    gameDescription: `Ancient Egypt, a land of majesty and intrigue, is disappearing in a ruthless fight for power. Unveil dark secrets and forgotten myths as you go back to the one founding moment: The Origins of the Assassin’s Brotherhood.`,
    releaseDate: '2017-10-27',
    PublisherInstanceId: 3,
    DeveloperInstanceId: 3,
    FeatureInstanceId: 1,
    GenreInstanceId: 3,
  },
];

export const generateGames = async (): Promise<void> => {
  gameData.forEach(async (gameItem) => {
    await GameInstance.create(gameItem);
  });
};
