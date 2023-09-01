import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
import { ConfigModule } from '@nestjs/config';
import { MapsModule } from './maps/maps.module';
import { PlacesController } from './maps/places/places.controller';
import { BullModule } from '@nestjs/bull';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379
      }
    }),
    RoutesModule,
    MapsModule,
    PrometheusModule.register()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
