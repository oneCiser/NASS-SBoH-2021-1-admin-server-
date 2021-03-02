/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

/**
 *
 * DTO for resource example
 * @category DTOs
 * @class maxsizeDTO
 * @param {number}maxsize - A property example
 */
class maxsizeDTO {
    @IsNotEmpty()
    @IsNumber()
    public maxsize: number;

    /**
   * Creates an instance of ExampleDTO.
   * @param {number} maxsize - the tile of resource
   * @memberof maxsizeDTO
   */
    constructor(maxsize: number) {
      this.maxsize = maxsize;
    }
}

export default maxsizeDTO;
