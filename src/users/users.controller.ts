import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a user by ID' })
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.update(id, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a user by ID' })
  partialUpdate(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.partialUpdate(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
