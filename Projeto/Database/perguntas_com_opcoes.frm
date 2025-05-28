TYPE=VIEW
query=select `p`.`id` AS `pergunta_id`,`p`.`texto` AS `pergunta_texto`,`o`.`id` AS `opcao_id`,`o`.`texto` AS `opcao_texto` from (`devs_choice`.`perguntas` `p` left join `devs_choice`.`opcoes` `o` on(`p`.`id` = `o`.`pergunta_id`))
md5=87eff53c635c902867630fa197351692
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=1
with_check_option=0
timestamp=0001748476257707969
create-version=2
source=SELECT `p`.`id` AS `pergunta_id`, `p`.`texto` AS `pergunta_texto`, `o`.`id` AS `opcao_id`, `o`.`texto` AS `opcao_texto` FROM (`perguntas` `p` left join `opcoes` `o` on(`p`.`id` = `o`.`pergunta_id`))
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_general_ci
view_body_utf8=select `p`.`id` AS `pergunta_id`,`p`.`texto` AS `pergunta_texto`,`o`.`id` AS `opcao_id`,`o`.`texto` AS `opcao_texto` from (`devs_choice`.`perguntas` `p` left join `devs_choice`.`opcoes` `o` on(`p`.`id` = `o`.`pergunta_id`))
mariadb-version=100432
