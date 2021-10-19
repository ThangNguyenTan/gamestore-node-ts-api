import { GenreInstance as genre } from './genre.model';
import { DeveloperInstance as developer } from './developer.model';
import { FeatureInstance as feature } from './feature.model';
import { PublisherInstance as publisher } from './publisher.model';
import { GameInstance as game } from './game.model';

game.belongsTo(genre);
game.belongsTo(developer);
game.belongsTo(feature);
game.belongsTo(publisher);

genre.hasMany(game);
developer.hasMany(game);
feature.hasMany(game);
publisher.hasMany(game);
