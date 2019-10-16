import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';

export class ControllerController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
  ) {}

  @post('/personas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            
          }),
        },
      },
    })
    persona: Persona,
  ): Promise<Persona> {
    return this.personaRepository.create(persona);
  }

  @get('/personas/count', {
    responses: {
      '200': {
        description: 'Persona model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas', {
    responses: {
      '200': {
        description: 'Array of Persona model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Persona)) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas', {
    responses: {
      '200': {
        description: 'Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Persona> {
    return this.personaRepository.findById(id);
  }

  @patch('/personas/{id}', {
    responses: {
      '204': {
        description: 'Persona PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}', {
    responses: {
      '204': {
        description: 'Persona PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}', {
    responses: {
      '204': {
        description: 'Persona DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
