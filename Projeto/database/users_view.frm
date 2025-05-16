TYPE=VIEW
query=select `devs_choice`.`users`.`id` AS `id`,`devs_choice`.`users`.`name` AS `name`,`devs_choice`.`users`.`role` AS `role`,case when `devs_choice`.`users`.`role` = \'moderator\' then `devs_choice`.`users`.`email` else NULL end AS `email`,case when `devs_choice`.`users`.`role` = \'moderator\' then `devs_choice`.`users`.`password` else NULL end AS `password` from `devs_choice`.`users`
md5=19b0dfa20ae9397b6611669296e8989d
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=0001743768659864042
create-version=2
source=SELECT \n  id,\n  name,\n  role,\n  CASE \n    WHEN role = \'moderator\' THEN email \n    ELSE NULL \n  END AS email,\n  CASE \n    WHEN role = \'moderator\' THEN password \n    ELSE NULL \n  END AS password\nFROM users
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `devs_choice`.`users`.`id` AS `id`,`devs_choice`.`users`.`name` AS `name`,`devs_choice`.`users`.`role` AS `role`,case when `devs_choice`.`users`.`role` = \'moderator\' then `devs_choice`.`users`.`email` else NULL end AS `email`,case when `devs_choice`.`users`.`role` = \'moderator\' then `devs_choice`.`users`.`password` else NULL end AS `password` from `devs_choice`.`users`
mariadb-version=100432
