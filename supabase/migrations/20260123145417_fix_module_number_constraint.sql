/*
  # Fix module_number constraint
  
  1. Changes
    - Drop the restrictive CHECK constraint that limits module_number to 1-9
    - Add new CHECK constraint allowing module_number from 0 to 99
    - This allows for introduction/welcome modules (0) and more modules
  
  2. Reason
    - The original constraint was too restrictive for real-world use
*/

ALTER TABLE member_course_modules 
DROP CONSTRAINT IF EXISTS member_course_modules_module_number_check;

ALTER TABLE member_course_modules 
ADD CONSTRAINT member_course_modules_module_number_check 
CHECK ((module_number >= 0) AND (module_number <= 99));
