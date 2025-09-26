// @ts-check
import { test, expect } from '@playwright/test';
import users from '../testData/usersResponseData.json'
import { request } from 'http';
import { console } from 'inspector';

test.describe('API verification test', () => {
  
  // 1. Test to verify users endpoint is returning expected users
  test("verify multiple records returned against stored static response", async ({request}) => {
      // save raw response into a variable

      const response = await request.get('https://reqres.in/api/users?page=1',
          {headers:
            {
              'x-api-key': 'reqres-free-v1'
            }
          })
        
      // parse the responses body into a JS object with access to the actual data within the response body

      const responseBody = await response.json()

      // Let's see what the response body response
      console.log(responseBody);

      expect(response.status()).toBe(200)
      expect(responseBody).toEqual(users)

  })

      // Test data for a single user 

      test('Test data for a single user', async({request}) => {
          const response = await request.get('https://reqres.in/api/users/2',
              {
            headers:
            {
              'x-api-key': 'reqres-free-v1'
            }
          })

          const responseBody = await response.json()

          console.log(responseBody);

          // Assert user information

          expect(response.status()).toBe(200)

          expect(responseBody.data.id).toBe(2)

          expect(responseBody.data.email).toBe('janet.weaver@reqres.in') 

          expect(responseBody.data.first_name).toBe('Janet')

          expect(responseBody.data.last_name).toBe('Weaver')
      })

      // test for POST request
      test('create a user record on the user API', async({request}) =>{

        const newUser = {
          name: "morpheus",
          job: "QA Engineer"
        }
        // Create request and save the response

        const response = await request.post('https://reqres.in/api/users', 
          {
          data: newUser,
            headers:
            {
              'x-api-key': 'reqres-free-v1'
            }
          })

        const responseBody = await response.json()

        console.log(responseBody)

        // verify response data
        expect(response.status()).toBe(201)

        expect(responseBody.name).toBe(newUser.name)

        expect(responseBody.job).toBe(newUser.job)

        expect(responseBody.createdAt).toBeDefined();      
      })

      // 4. verify PUT request to update a data
      test('Verify PUT request', async ({request}) => {
        
        const updateUser = {
          name: "Mr Nanu Chris",
          job: "USA press correspondent"
        }

        //Do PUT request and save response

        const response = await request.put('https://reqres.in/api/users/2', {
          data: updateUser,
          headers:
            {
              'x-api-key': 'reqres-free-v1'
            }
        })

        const responseBody = await response.json()

        console.log(responseBody)

        // Verify response body
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(updateUser.name)
        expect(responseBody.job).toBe(updateUser.job)

      })

      // do DELETE request
      test('Verify user is deleted', async ({request}) => {
        
        const response = await request.delete('https://reqres.in/api/users/4',
            {
            headers:
            {
              'x-api-key': 'reqres-free-v1'
            }
          })
        expect(response.status()).toBe(204)
      })
  })
