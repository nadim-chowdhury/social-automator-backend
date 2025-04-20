// schedule.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from '../entities/schedule.entity';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(@Body() createScheduleDto: any) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get(':id')
  async getSchedule(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  // Add other CRUD endpoints
}
