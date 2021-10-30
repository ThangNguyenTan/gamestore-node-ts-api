import { GenreInstance as genre } from './genre.model';
import { DeveloperInstance as developer } from './developer.model';
import { FeatureInstance as feature } from './feature.model';
import { PublisherInstance as publisher } from './publisher.model';
import { GameInstance as game } from './game.model';
import { UserInstance as user } from './user.model';
import { OrderInstance as order } from './order.model';
import { WishlistInstance as wishlist } from './wishlist.model';

game.belongsTo(genre);
game.belongsTo(developer);
game.belongsTo(feature);
game.belongsTo(publisher);
order.belongsTo(user);
order.belongsTo(game);
wishlist.belongsTo(user);
wishlist.belongsTo(game);

game.hasMany(order);
user.hasMany(order);
genre.hasMany(game);
developer.hasMany(game);
feature.hasMany(game);
publisher.hasMany(game);
