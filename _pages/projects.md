---
layout: page
permalink: /projects/
title: Projects
description: Research artifacts, open-source software, and representative studies.
nav: true
nav_order: 2
---

{% assign sorted_projects = site.projects | sort: 'importance' %}

<p>
  This page collects research-facing projects that best represent my work across federated learning, optimization, and applied machine learning.
  Each entry links to a short overview, code when available, and the corresponding paper or artifact.
</p>

<div class="projects">
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
  </div>
</div>
