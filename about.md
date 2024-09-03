---
layout: about
permalink: /about/
title: À propos
subtitle: About
---

**Vavastien - artiste**
<br>``Vavastien - artist``

Peintre autodidacte français, basé à Toulouse, France.
<br>``French freelance painter based in Toulouse, France.``

> “Il n'y a pas d'erreurs, que d'heureux accidents.”
  <br>`` “There are no mistakes, only happy accidents.” ``


Si vous souhaitez nous poser des questions, n'hésitez pas à nous contacter à:
<br>``If you would like to ask a question, please contact us at:``


{% assign contact_page = site.data.theme.contact_page | default: '' %}
{% if contact_page %}
{% assign my_page = site.pages | where: "path", contact_page | first %}
{% if my_page.title %}
- [✉ {{ my_page.title | escape }} / {{ my_page.title-en | escape }}]( {{ my_page.url | relative_url }} )
{% endif %}
{% endif %}
